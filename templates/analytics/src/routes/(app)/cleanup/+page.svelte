<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import SearchForItemForm from '$lib/components/forms/SearchForItemForm.svelte';
	import { flatten } from '$lib/fxns';
	import type { iFlattenedSKU } from '$lib/interface';
	import { modalStore, cleanupStore } from '$lib/stores';
	import { getColumns } from './columns';
	import ExportData from '$lib/components/forms/ExportData.svelte';
	import StatusTable from '$lib/components/widgets/StatusTable.svelte';
	import ProductCleanupForm from '$lib/components/forms/ProductCleanupForm.svelte';
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';

	let selectedRows = $state<iFlattenedSKU[]>([]);
	let filteredRows = $state<iFlattenedSKU[]>([]);
	let shouldSelectRow = $state<boolean>(true);

	let data = $derived<iFlattenedSKU[]>(Object.values($cleanupStore.jumia ?? {}).map(flatten));
	const { columns } = getColumns(modalStore, cleanupStore);

	const ondelete = async () => {
		const ids = selectedRows.map((row) => row.sku);

		ids.forEach((id) => {
			cleanupStore.update((existing) => {
				delete existing.jumia[id];

				return existing;
			});
		});
	};

</script>

<Wrap class="flex flex-col gap-4 py-8 md:py-16">
	<div class="flex flex-col gap-2">
		<div class="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 xl:grid-cols-4">
			<SearchForItemForm type="cleanup" store={cleanupStore} />
			<ProductCleanupForm />
			<StatusTable class="w-full" />
			<ExportData store={cleanupStore} />
		</div>
	</div>
	{#key $cleanupStore}
		<DataTable
			{ondelete}
			bind:shouldSelectRow
			bind:filteredRows
			bind:selectedRows
			{columns}
			bind:data
		/>
	{/key}
</Wrap>
