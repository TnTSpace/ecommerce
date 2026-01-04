<script lang="ts">
	import { genderOptions, refereeCourseOptions } from '$lib/constants';
	import type { RefereeInterface, iRefereeData } from '$lib/interface';
	import type { iResult } from '@toolsntuts/utils';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import Select from '$lib/components/widgets/Select.svelte';
	import SpinLoader from '$lib/components/widgets/SpinLoader.svelte';
	import { toast } from 'svelte-sonner';
	import CountrySelector from '$lib/components/ui/country-selector/country-selector.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	interface Props {
		referee?: RefereeInterface;
		referralId?: string;
	}

	let { referee, referralId }: Props = $props();

	const buttonText = referee ? 'Update' : 'Create';

	let placeholder = $state<Partial<RefereeInterface>>(
		referee
			? referee
			: {
					name: '',
					email: '',
					phone: '',
					gender: 'female',
					referral: ''
				}
	);

	let refereeData = $state<iRefereeData>(
		referee
			? (JSON.parse(referee.data as string) as iRefereeData)
			: {
					country: 'GB',
					course: 'MSc',
					courseName: ''
				}
	);

	let loading = $state(false);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		try {
			loading = true;

			if (!placeholder.phone) {
				toast.error('Type your phone number digit by digit');
				return;
			}

			const partialReferee: Partial<RefereeInterface> = {
				...referee,
				name: placeholder.name,
				email: placeholder.email,
				gender: placeholder.gender,
				phone: placeholder.phone,
				referral: referralId,
				data: JSON.stringify({
					country: refereeData.country,
					course: refereeData.course,
					courseName: refereeData.courseName
				})
			};

			let url: string;
			let options: RequestInit;
			if (referee) {
				console.log('inside patch');
				url = `/api/referees/${referee.xata_id}`;
				options = {
					method: 'patch',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialReferee)
				};
			} else {
				console.log('inside post');
				url = '/api/referees';
				options = {
					method: 'post',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(partialReferee)
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
	<ScrollArea class="h-fit">
		<div class="flex flex-col gap-2">
			<div class="grid grid-cols-1 gap-2 p-1 md:grid-cols-2">
				<Input
					name="name"
					type="text"
					required
					bind:value={placeholder.name}
					placeholder="*Enter referee's full name"
				/>
				<Input
					name="email"
					type="email"
					bind:value={placeholder.email}
					placeholder="*Enter referee's email"
				/>
				<PhoneInput
					class="w-full"
					bind:value={placeholder.phone}
					placeholder="*Enter referee's phone number"
				/>
				<Select bind:value={placeholder.gender} name="gender" options={genderOptions} />
			</div>
			<div class="grid grid-cols-1 gap-2 p-1 md:grid-cols-2">
				<Select bind:value={refereeData.course} name="course" options={refereeCourseOptions} />
				<CountrySelector bind:selected={refereeData.country} />
				<Input
					name="courseName"
					type="courseName"
					bind:value={refereeData.courseName}
					placeholder="*Enter referee's course of study"
					class="md:col-span-2"
				/>
			</div>
		</div>
	</ScrollArea>
	{#if loading}
		<Button class="w-full self-center sm:w-fit">
			<span>Loading...</span>
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit" class="w-full self-center sm:w-fit">{buttonText}</Button>
	{/if}
</form>
