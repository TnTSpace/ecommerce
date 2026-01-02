<script lang="ts">
	import { CopyIcon, DownloadIcon } from 'lucide-svelte';
	import GoogleSheets from '../icons/GoogleSheets.svelte';
	import { Button } from '../ui/button';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import { downloadCSV, flatten } from '$lib/fxns';
	import { exportToGoogleSheets } from '$lib/client/actions';
	import { onCopy } from '@toolsntuts/utils';
	import type { Writable } from 'svelte/store';
	import type { iSKUStore } from '$lib/interface';
	import { CountryCompetitors } from '$lib/constants';

	interface Props {
		store: Writable<iSKUStore>;
	}

	let { store }: Props = $props();

	let csvLoading = $state(false);
	let gsLoading = $state(false);
	let cvLoading = $state(false);
	let chLoading = $state(false);

	const handleCSVDownload = async () => {
		csvLoading = true;

		const products = Object.values($store.jumia);
		let downloadList = products.map(flatten);
		downloadCSV(downloadList, `Download_${$store.country.name}`);
		csvLoading = false;
	};

	const handleExportToGoogleSheets = async () => {
		gsLoading = true;
		const products = Object.values($store.jumia);
		let downloadList = products.map(flatten);
		await exportToGoogleSheets(downloadList, $store.country.code);
		gsLoading = false;
	};

	const handleCopy = async (type: 'horizontal' | 'vertical') => {
		if (type === 'horizontal') {
			chLoading = true;
		} else {
			cvLoading = true;
		}
		const skus = Object.keys($store.jumia);
		switch (type) {
			case 'horizontal':
				setTimeout(async () => {
					await onCopy(skus.join(','));
					chLoading = false;
				}, 1000);
				break;

			case 'vertical':
				setTimeout(async () => {
					await onCopy(skus.join('\n'));
					cvLoading = false;
				}, 1000);
				break;
		}
	};
</script>

<div class="grid w-full grid-cols-1 gap-1 bg-white dark:bg-secondary rounded-lg shadow-jumia p-2">
	<h2 class="text-muted-foreground text-sm">Export Data</h2>
	<div class="grid grid-cols-2 gap-2">
		<Button
			onclick={handleExportToGoogleSheets}
			class="w-full"
			variant="outline"
			disabled={gsLoading}
		>
			{#if gsLoading}
				<SpinLoader />
				<span>Loading...</span>
			{:else}
				<GoogleSheets class="size-4" />
				<span>Google Sheets</span>
			{/if}
		</Button>
		<Button onclick={handleCSVDownload} class="w-full" variant="outline" disabled={csvLoading}>
			{#if csvLoading}
				<SpinLoader />
				<span>Loading...</span>
			{:else}
				<DownloadIcon class="size-4" />
				<span>Download CSV</span>
			{/if}
		</Button>
		<Button
			onclick={() => handleCopy('vertical')}
			class="w-full"
			variant="outline"
			disabled={cvLoading}
		>
			{#if cvLoading}
				<SpinLoader />
				<span>Loading...</span>
			{:else}
				<CopyIcon />
				<span>Copy Vertical</span>
			{/if}
		</Button>
		<Button
			onclick={() => handleCopy('horizontal')}
			class="w-full"
			variant="outline"
			disabled={chLoading}
		>
			{#if chLoading}
				<SpinLoader />
				<span>Loading...</span>
			{:else}
				<CopyIcon />
				<span>Copy Horizontal</span>
			{/if}
		</Button>
	</div>
</div>
