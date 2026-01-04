<script lang="ts">
	import { referralTypeOptions, genderOptions } from '$lib/constants';
	import type { ReferralInterface, iReferralData, iUser } from '$lib/interface';
	import type { iResult } from '@toolsntuts/utils';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import Select from '$lib/components/widgets/Select.svelte';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import { toast } from 'svelte-sonner';
	import CountrySelector from '$lib/components/ui/country-selector/country-selector.svelte';
	import { getContext } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	interface Props {
		referral?: ReferralInterface;
	}

	let { referral }: Props = $props();

	const me = getContext('me') as iUser;

	let placeholder = $state<Partial<ReferralInterface>>(
		referral
			? referral
			: {
					name: '',
					email: me.email,
					phone: '',
					gender: 'female'
				}
	);

	let referralData = $state<iReferralData>(
		referral
			? (JSON.parse(referral.data as string) as iReferralData)
			: {
					paypalEmail: '',
					bankName: '',
					accountName: '',
					accountNumber: '',
					sortCode: '',
					swiftCode: '',
					type: 'Customer',
					country: ''
				}
	);

	let loading = $state(false);

	$effect(() => console.log({ referral }));

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;

		const formData = new FormData(form);

		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;

			const partialReferral: Partial<ReferralInterface> = {
				...referral,
				name: placeholder.name,
				email: placeholder.email,
				gender: placeholder.gender,
				phone: placeholder.phone,
				data: JSON.stringify({
					paypalEmail: referralData.paypalEmail,
					bankName: referralData.bankName,
					accountName: referralData.accountName,
					accountNumber: referralData.accountNumber,
					sortCode: referralData.sortCode,
					swiftCode: referralData.swiftCode,
					type: referralData.type,
					country: referralData.country
				})
			};

			let url: string;
			let options: RequestInit;
			if (referral) {
				console.log('inside patch');
				url = `/api/referrals/${referral.xata_id}`;
				options = {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialReferral)
				};
			} else {
				console.log('inside post');
				url = '/api/referrals';
				options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialReferral)
				};
			}
			const response = await fetch(url, options);
			const { status, message } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success(message);
				location.reload();
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<form {onsubmit} class="flex flex-col gap-4">
	<ScrollArea class="h-80">
		<div class="flex flex-col gap-2">
			<div class="grid grid-cols-1 gap-2 p-1 md:grid-cols-2">
				<Input
					name="name"
					type="text"
					required
					bind:value={placeholder.name}
					placeholder="*Enter your full name"
				/>
				<Input
					name="email"
					type="email"
					bind:value={placeholder.email}
					placeholder="*Enter your email"
				/>
				<PhoneInput
					class="w-full"
					bind:value={placeholder.phone}
					placeholder="*Enter your phone number"
				/>
				<Select bind:value={placeholder.gender} name="gender" options={genderOptions} />
			</div>
			<div class="grid grid-cols-1 gap-2 p-1 md:grid-cols-2">
				<div>
					<Label class="text-sm">What type of referral are you?</Label>
					<Select bind:value={referralData.type} name="type" options={referralTypeOptions} />
				</div>
				<div>
					<Label class="text-sm">What is your country of residence?</Label>
					<CountrySelector bind:selected={referralData.country} />
				</div>
				<div class="flex flex-col gap-2">
					<Label>Nigerian Account</Label>
					<Input
						name="bankName"
						type="bankName"
						bind:value={referralData.bankName}
						placeholder="Enter your bank name"
					/>
					<Input
						name="accountName"
						type="accountName"
						bind:value={referralData.accountName}
						placeholder="Enter your account name"
					/>
					<Input
						name="accountNumber"
						type="accountNumber"
						bind:value={referralData.accountNumber}
						placeholder="Enter your account number"
					/>
				</div>
				<div class="flex flex-col gap-2">
					<Label>Not a Nigerian Account</Label>
					<Input
						name="paypalEmail"
						type="email"
						bind:value={referralData.paypalEmail}
						placeholder="Enter your paypal email if any"
					/>
					<Input
						name="sortCode"
						type="sortCode"
						bind:value={referralData.sortCode}
						placeholder="Enter your sort code"
					/>
					<Input
						name="swiftCode"
						type="swiftCode"
						bind:value={referralData.swiftCode}
						placeholder="Enter your swift code"
					/>
				</div>
			</div>
		</div>
	</ScrollArea>
	{#if loading}
		<Button class="w-full self-center sm:w-fit">
			<span>Loading...</span>
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit" class="w-full self-center sm:w-fit">Update</Button>
	{/if}
</form>
