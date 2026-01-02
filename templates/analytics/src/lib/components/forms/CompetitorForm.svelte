<script lang="ts">
	import { BoxesIcon, DownloadIcon } from 'lucide-svelte';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import { Button } from '../ui/button';
	import type { iKeyData, iSKU, iPayload, TCompetitor } from '$lib/interface';
	import { competitorLogo, CountryCompetitors, competitors } from '$lib/constants';
	import { skuStore, loadingStore } from '$lib/stores';
	import { Finder } from '$lib/hooks/finder.svelte';
	import { browser } from '$app/environment';
	import { downloadCSV, getUrl } from '$lib/fxns';
	import N8n from '../icons/n8n.svelte';
	import { firecrawl } from '$lib/hooks/firecrawl.svelte';
	import { toast } from 'svelte-sonner';

	let finder = Finder.getInstance();
	let loading = $state(false);
	let loadingInput = $state(false);
	let refetchList = $state<iSKU[]>([]);
	let products = $state<iSKU[]>([]);

	let competitorList = competitors[$skuStore.country.name.toLowerCase()]


	// const getSearchNames = async (products: iSKU[]) => {
	// 	try {
	// 		const url = `/api/ai/product-names`;
	// 		const options: RequestInit = {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ products })
	// 		};
	// 		const response = await fetch(url, options);
	// 		const result = await response.json();
	// 		const output = result.output as string;
	// 		const split = output
	// 			.split('\n')
	// 			.filter((str, i) => str.trim().length && i !== 0)
	// 			.map((str) => {
	// 				str = str.replaceAll('*', '').trim();
	// 				const indexOfDash = str.indexOf('- ');
	// 				if (indexOfDash === 0) {
	// 					str = str.replace('- ', '');
	// 				}
	// 				return str.trim();
	// 			})
	// 			.map((str, i) => {
	// 				const product = products[i];
	// 				const name = str;
	// 				let json = { ...product, name };
	// 				return json;
	// 			});
	// 		return split as iSKU[];
	// 	} catch (error: any) {
	// 		console.log(error.message);
	// 		return products;
	// 	}
	// };

	const scrapeOps = async () => { 
		loadingInput = true;
		$loadingStore = true;
		finder.resetStats();

		const skus = Object.values($skuStore.jumia);
		finder.total = skus.length;

		products = skus

		let payload: iPayload = {
			competitors: competitorList,
			products,
			country: $skuStore.country.code,
			countryName: $skuStore.country.name
		}

		console.log({ payload })

		try {
			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ payload })
			};
			const response = await fetch('/api/n8n', options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			console.log({ result });
			toast.success('Scrape in progress', {
				description: 'You will be notified when the scrape is complete.'
			});
		} catch (error: any) {
			console.error('Error fetching products:', error.message);
			toast.error('Failed to start scrape', {
				description: error.message || 'An error occurred while starting the scrape.'
			});
		} finally {

			loadingInput = false;
			$loadingStore = false;
		}
	}
	const onclick = async () => {
		console.log('Starting competitor check...');
		await scrapeOps()
	};
</script>

<div class="grid w-full grid-cols-1 gap-1 rounded-lg bg-white p-2 shadow-jumia dark:bg-secondary">
	<h2 class="text-sm text-muted-foreground">Competitor Scrape</h2>
	<div class="grid w-full grid-cols-1 gap-2 place-items-end">
		<!-- <div class="flex h-10 items-center gap-1">
			{#if browser}
				{#each competitorList as name, i}
					{@const Logo = competitorLogo[name as TCompetitor]}
					<Logo class="h-6" />
				{/each}
			{/if}
		</div> -->
		<div class="grid grid-cols-2 gap-2 w-full">
			<Button {onclick} class="w-full" disabled={$loadingStore}>
				<BoxesIcon class="size-4" />
				{#if $loadingStore}
					Loading... <SpinLoader />
				{:else}
					Competition
				{/if}
			</Button>
		</div>
	</div>
</div>
