<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Select from '$lib/components/ui/select';
	import {
		Calendar as CalendarIcon,
		Clock,
		Loader2,
		ArrowRight,
		ShieldCheck
	} from '@lucide/svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { format } from 'date-fns';
	import { getLocalTimeZone, type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import type { iDoctor } from '$lib/interface';

	let { doctor, open = $bindable(false) } = $props<{
		doctor: iDoctor | null;
		open?: boolean;
	}>();

	let loading = $state(false);
	let date = $state<DateValue | undefined>(undefined);
	let time = $state('');
	let reason = $state('');

	const serviceCharge = $derived(doctor ? Math.round(doctor.price * 0.15) : 0);
	const totalFee = $derived(doctor ? doctor.price + serviceCharge : 0);

	async function handleBook() {
		if (!doctor || !date || !time) return;
		loading = true;

		try {
			const response = await fetch('/api/consultations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					doctorId: doctor.id,
					type: 'general', // Simplified for now
					appointmentDate: date.toDate(getLocalTimeZone()).toISOString(),
					appointmentTime: time,
					reason
				})
			});

			const result = await response.json();
			if (result.success && result.payment_url) {
				// Redirect to Paystack
				window.location.href = result.payment_url;
			} else {
				alert(result.message || 'Booking failed');
			}
		} catch (e) {
			console.error(e);
			alert('An error occurred');
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
			<Dialog.Title class="text-2xl font-bold">Book Consultation</Dialog.Title>
			<Dialog.Description class="font-medium">
				With <span class="text-primary font-bold">{doctor?.name}</span> • {doctor?.specialty}
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-6 py-4">
			<div class="grid gap-2">
				<Label class="font-bold capitalize text-sm tracking-widest text-muted-foreground"
					>Select Date</Label
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

			<div class="grid gap-2">
				<Label class="font-bold capitalize text-sm tracking-widest text-muted-foreground"
					>Select Time Slot</Label
				>
				<div class="grid grid-cols-3 gap-2">
					{#each ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'] as t}
						<Button
							variant={time === t ? 'default' : 'outline'}
							class="rounded-xl font-bold {time === t
								? 'shadow-lg shadow-primary/20'
								: 'border-border/40 bg-background/50'}"
							onclick={() => (time = t)}
						>
							{t}
						</Button>
					{/each}
				</div>
			</div>

			<div class="grid gap-2">
				<Label class="font-bold capitalize text-sm tracking-widest text-muted-foreground"
					>Reason for Visit</Label
				>
				<Textarea
					placeholder="Briefly describe your symptoms or reason for consultation..."
					bind:value={reason}
					class="rounded-2xl border-border/50 bg-background/50 min-h-[100px] font-medium"
				/>
			</div>

			<div class="bg-primary/5 p-4 rounded-2xl border border-primary/20 flex gap-3">
				<ShieldCheck class="w-5 h-5 text-primary shrink-0" />
				<p class="text-[11px] text-muted-foreground font-medium">
					Your payment of <span class="text-foreground font-bold"
						>₦{(totalFee / 100).toLocaleString()}</span
					> is secured by Paystack. You will be redirected to complete the transaction.
				</p>
			</div>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full py-8 rounded-2xl font-bold  shadow-xl"
				onclick={handleBook}
				disabled={loading || !date || !time}
			>
				{#if loading}
					<Loader2 class="mr-2 h-5 w-5 animate-spin" />
					Processing...
				{:else}
					Proceed to Payment
					<ArrowRight class="ml-2 w-5 h-5" />
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
