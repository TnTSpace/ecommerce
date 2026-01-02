<script lang="ts">
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getColumns } from './columns';
	import { modalStore } from '$lib/stores';
	import type { iFlattenedSKU, iSKU, iGenericCompetitor } from '$lib/interface';
	import { skuStore } from '$lib/stores';
	import StatusTable from '$lib/components/widgets/StatusTable.svelte';
	import SearchForItemForm from '$lib/components/forms/SearchForItemForm.svelte';
	import CompetitorForm from '$lib/components/forms/CompetitorForm.svelte';
	import ExportData from '$lib/components/forms/ExportData.svelte';
	import { flatten } from '$lib/fxns';
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';
	import { supabase } from '$lib/client/supabase';
	import { onMount } from 'svelte';
	import {
		collection,
		getDocs,
		onSnapshot,
		QuerySnapshot,
		type DocumentData
	} from 'firebase/firestore';
	import { db } from '$lib/client/firebase';

	let runlist = $state<iFlattenedSKU[]>(Object.values($skuStore.jumia).map(flatten)); 

	const { columns } = getColumns(modalStore, skuStore);
	let selectedRows = $state<iFlattenedSKU[]>([]);
	let filteredRows = $state<iFlattenedSKU[]>([]);
	let shouldSelectRow = $state<boolean>(true);

	const ondelete = async () => {
		const ids = selectedRows.map((row) => row.sku);

		ids.forEach((id) => {
			skuStore.update((existing) => {
				delete existing.jumia[id];

				return existing;
			});
		});
	};


	$effect(() => {
		runlist = Object.values($skuStore.jumia).map(flatten);
	});

	$effect(() => { 
		getDocs(collection(db, $skuStore.country.code))
			.then(processCompetitors)
			.catch((error) => {
				console.error('Error getting documents: ', error);
			});
	});

	const processCompetitors = (querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
		const list: iGenericCompetitor[] = [];
		querySnapshot.docs.forEach((doc) => {
			const data = doc.data() as iGenericCompetitor;
			list.push(data);
		});

		Object.keys($skuStore.jumia).forEach((sku) => { 
			const product = $skuStore.jumia[sku]
			const competitorData = list.filter((item) => item.sku === sku);
			const groupedByCompetitor = Object.groupBy(competitorData, (item) => item.competitor);
			product.competition = groupedByCompetitor;
		});
		const groupedByCompetitor = Object.groupBy(list, (item) => item.competitor);
	};

	onMount(() => {
		// Listen to a collection instead of a single document
		const colRef = collection(db, $skuStore.country.code);
		const unsub = onSnapshot(colRef, { includeMetadataChanges: true }, processCompetitors);

		return () => {
			unsub();
		};
	});

	// const updateProducts = async () => {
	// 	const promise = async (product: iSKU) => {
	// 		const code = $skuStore.country.code;
	// 		const sku = product.sku;

	// 		let { data, error } = await supabase.from(code).select('*').eq('sku', sku);

	// 		if (data && data.length) {
	// 			const scrapedProducts = data as iGenericCompetitor[];
	// 			const groupedByCompetitor = Object.groupBy(scrapedProducts, (item) => item.competitor);
	// 			product.competition = groupedByCompetitor;
	// 		}
	// 	};

	// 	const promises = Object.values($skuStore.jumia).map(promise);

	// 	await Promise.all(promises);
	// };

	// onMount(async () => {
	// 	await updateProducts();
	// });
</script>

<Wrap class="flex flex-col gap-4 bg-jumia-light-bg dark:bg-background">
	<div class="flex flex-col gap-2 md:gap-4 md:!px-0 md:center">
		<div class="flex flex-col gap-2">
			<div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
				<SearchForItemForm type="competition" store={skuStore} />
				<CompetitorForm />
				<StatusTable class="w-full" />
				<ExportData store={skuStore} />
			</div>
		</div>
		<DataTable
			{ondelete}
			bind:shouldSelectRow
			bind:filteredRows
			bind:selectedRows
			{columns}
			bind:data={runlist}
		/>
		<div id="google"></div>
	</div>
</Wrap>
