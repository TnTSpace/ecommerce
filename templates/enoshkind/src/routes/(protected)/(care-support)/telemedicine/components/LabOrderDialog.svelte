<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import {
		Calendar as CalendarIcon,
		Loader2,
		ArrowRight,
		ShieldCheck,
		Beaker,
		MapPin
	} from '@lucide/svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { format } from 'date-fns';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	let { open = $bindable(false) } = $props<{ open?: boolean }>();

	let loading = $state(false);
	let date = $state<DateValue | undefined>(undefined);
	let testType = $state('');

	const TEST_PACKAGES = [
		{ id: 'essential', name: 'Essential Health Check', price: 25000 },
		{ id: 'comprehensive', name: 'Comprehensive Wellness', price: 55000 },
		{ id: 'diabetes', name: 'Diabetes Monitoring', price: 18000 },
		{ id: 'hormonal', name: 'Hormonal Profile', price: 42000 }
	];

	async function handleBook() {
		if (!testType || !date) return;
		loading = true;

		try {
			const response = await fetch('/api/lab-orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					testType,
					scheduledCollection: date.toDate(getLocalTimeZone()).toISOString()
				})
			});

			const result = await response.json();
			if (result.success && result.payment_url) {
				// Redirect to Paystack
				window.location.href = result.payment_url;
			} else {
				toast.error('Error', { description: result.message || 'Booking failed' });
			}
		} catch (e) {
			console.error(e);
			toast.error('Error', { description: 'An error occurred' });
		} finally {
			loading = false;
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="sm:max-w-[500px] rounded-[2rem] border-border/40 bg-card/60 backdrop-blur-2xl shadow-2xl"
	>
		<Dialog.Header>
			<Dialog.Title class="text-2xl font-bold flex items-center gap-3">
				<Beaker class="w-6 h-6 text-primary" />
				Book Home Test
			</Dialog.Title>
			<Dialog.Description class="font-medium">
				Certified medical technicians will visit your location for sample collection.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-6 py-4">
			<div class="grid gap-3">
				<Label class="font-bold capitalize text-sm tracking-widest text-muted-foreground"
					>Select Test Package</Label
				>
				<div class="grid grid-cols-1 gap-2">
					{#each TEST_PACKAGES as pkg}
						<button
							class={cn(
								'flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left',
								testType === pkg.id
									? 'border-primary bg-primary/5 shadow-md'
									: 'border-border/40 bg-background/50 hover:bg-background'
							)}
							onclick={() => (testType = pkg.id)}
						>
							<div>
								<p class="font-bold text-sm">{pkg.name}</p>
								<p class="text-sm text-muted-foreground">Certified Lab Analysis</p>
							</div>
							<div class="text-primary font-bold">
								₦{pkg.price.toLocaleString()}
							</div>
						</button>
					{/each}
				</div>
			</div>

			<div class="grid gap-3">
				<Label class="font-bold capitalize text-sm tracking-widest text-muted-foreground"
					>Preferred Collection Date</Label
				>
				<Popover.Root>
					<Popover.Trigger>
						<Button
							variant={'outline'}
							class={cn(
								'w-full justify-start text-left font-bold h-9 rounded-2xl border-border/50 bg-background/50',
								!date && 'text-muted-foreground'
							)}
						>
							<CalendarIcon class="mr-2 h-5 w-5 text-primary" />
							{date ? format(date.toDate(getLocalTimeZone()), 'PPP') : 'Pick a date'}
						</Button>
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0 rounded-2xl border-border/40 shadow-2xl">
						<Calendar type="single" bind:value={date} initialFocus />
					</Popover.Content>
				</Popover.Root>
			</div>

			<div class="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20 flex gap-3">
				<MapPin class="w-5 h-5 text-emerald-500 shrink-0" />
				<p class="text-[11px] text-muted-foreground font-medium">
					Service available in Lagos, Abuja, and Port Harcourt. More cities coming soon.
				</p>
			</div>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full py-8 rounded-2xl font-bold  shadow-xl"
				onclick={handleBook}
				disabled={loading || !testType || !date}
			>
				{#if loading}
					<Loader2 class="mr-2 h-5 w-5 animate-spin" />
					Processing...
				{:else}
					Confirm Booking
					<ArrowRight class="ml-2 w-5 h-5" />
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
