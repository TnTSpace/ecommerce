<script lang="ts">
	import OrderListRow from './OrderListRow.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as ScrollArea from '$lib/components/ui/scroll-area';
	import { Button } from '$lib/components/ui/button';
	import { Calendar as CalendarIcon, Video, Beaker, Pill } from '@lucide/svelte';

	let { open = $bindable(false), onViewDetails } = $props<{
		open?: boolean;
		onViewDetails?: (item: any, type: string) => void;
	}>();

	let consultations = $state<any[]>([]);
	let labOrders = $state<any[]>([]);
	let pharmacyOrders = $state<any[]>([]);
	let loading = $state(false);

	async function fetchData() {
		loading = true;
		try {
			const [cRes, lRes, pRes] = await Promise.all([
				fetch('/api/consultations'),
				fetch('/api/lab-orders'),
				fetch('/api/pharmacy-orders')
			]);

			if (cRes.ok) consultations = (await cRes.json()).data || [];
			if (lRes.ok) labOrders = (await lRes.json()).data || [];
			if (pRes.ok) pharmacyOrders = (await pRes.json()).data || [];
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (open) fetchData();
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="sm:max-w-[600px] h-[80vh] flex flex-col border-border/40 bg-card/60 backdrop-blur-2xl shadow-2xl p-0 overflow-hidden"
	>
		<Dialog.Header class="p-6 pb-2">
			<Dialog.Title class="text-2xl font-bold flex items-center gap-3">
				<CalendarIcon class="w-6 h-6 text-primary" />
				My Telemedicine Activity
			</Dialog.Title>
			<Dialog.Description class="font-medium">
				Track your appointments, lab tests, and pharmacy orders.
			</Dialog.Description>
		</Dialog.Header>

		<Tabs.Root value="consults" class="flex-1 flex flex-col pb-6">
			<div class="px-6">
				<Tabs.List class="grid grid-cols-3 w-full bg-background/50 p-1 border border-border/40">
					<Tabs.Trigger value="consults" class="font-bold text-xs py-2">Consults</Tabs.Trigger>
					<Tabs.Trigger value="labs" class="font-bold text-xs py-2">Labs</Tabs.Trigger>
					<Tabs.Trigger value="pharmacy" class="font-bold text-xs py-2">Pharmacy</Tabs.Trigger>
				</Tabs.List>
			</div>

			<ScrollArea.Root class="flex-1 mt-4 px-6">
				<Tabs.Content value="consults" class="space-y-4 m-0">
					{#each consultations as item}
						<OrderListRow type="consultation" {item} screen="mobile" {onViewDetails} />
					{:else}
						<div class="text-center py-12 text-muted-foreground">
							<Video class="w-12 h-12 mx-auto mb-4 opacity-20" />
							<p class="font-medium">No virtual consultations found.</p>
						</div>
					{/each}
				</Tabs.Content>

				<Tabs.Content value="labs" class="space-y-4 m-0">
					{#each labOrders as item}
						<OrderListRow type="lab" {item} screen="mobile" {onViewDetails} />
					{:else}
						<div class="text-center py-12 text-muted-foreground">
							<Beaker class="w-12 h-12 mx-auto mb-4 opacity-20" />
							<p class="font-medium">No home tests booked yet.</p>
						</div>
					{/each}
				</Tabs.Content>

				<Tabs.Content value="pharmacy" class="space-y-4 m-0">
					{#each pharmacyOrders as item}
						<OrderListRow type="pharmacy" {item} screen="mobile" {onViewDetails} />
					{:else}
						<div class="text-center py-12 text-muted-foreground">
							<Pill class="w-12 h-12 mx-auto mb-4 opacity-20" />
							<p class="font-medium">No pharmacy orders found.</p>
						</div>
					{/each}
				</Tabs.Content>
			</ScrollArea.Root>
		</Tabs.Root>

		<div class="p-6 border-t border-border/40 bg-background/20">
			<Button
				variant="outline"
				class="w-full font-bold py-6 hover:bg-primary/5 hover:text-primary transition-all"
				onclick={() => (open = false)}
			>
				Close Activity Center
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
