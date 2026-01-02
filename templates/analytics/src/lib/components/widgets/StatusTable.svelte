<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { cn } from '$lib/utils';
	import { PackageIcon, CheckIcon, XIcon } from 'lucide-svelte';
	import { Finder } from '$lib/hooks/finder.svelte';
	import { loadingStore } from '$lib/stores';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	const finder = Finder.getInstance();

	const invoices = [
		{
			invoice: 'INV001',
			paymentStatus: '10',
			totalAmount: '5',
			paymentMethod: '15'
		}
	];
</script>

<div class="grid grid-cols-1 gap-1 bg-white dark:bg-secondary rounded-lg shadow-jumia p-2">
	<h2 class="text-muted-foreground text-sm">Statistics</h2>
<Table.Root class={cn('w-fit', className)}>
	<Table.Header>
		<Table.Row>
			<Table.Head>
				<div class="flex items-center gap-1">
					<CheckIcon class="size-4" />
					<span>Pass</span>
				</div>
			</Table.Head>
			<Table.Head>
				<div class="flex items-center gap-1">
					<XIcon class="size-4" />
					<span>Fails</span>
				</div>
			</Table.Head>
			<Table.Head class="text-right">
				<div class="flex items-center gap-1">
					<PackageIcon class="size-4" />
					<span>Total</span>
					{#if $loadingStore}
						<span class="ml-2 flex h-3 w-3 -translate-x-1/2">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75"
							></span>
							<span class="relative inline-flex h-3 w-3 rounded-full bg-orange-600"></span>
						</span>
					{/if}
				</div>
			</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each invoices as invoice (invoice)}
			<Table.Row>
				<Table.Cell class="text-center">{finder.pass}</Table.Cell>
				<Table.Cell class="text-center">{finder.fail}</Table.Cell>
				<Table.Cell class="text-center">{finder.total}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
</div>
