<script lang="ts">
	import { Button } from '../ui/button';
	import { Finder, finder } from '$lib/hooks/finder.svelte';
	import { cleanupStore } from '$lib/stores';
	import { toast } from 'svelte-sonner';
	import type { iResult } from '@toolsntuts/utils';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import { PackageSearchIcon } from 'lucide-svelte';

	let loading = $state(false);

	const onclick = async () => {
		loading = true;
		console.log('onclick');
		const products = Object.values($cleanupStore.jumia);
		console.log('after products');
		try {
			console.log('inside try');
			const result = await finder.getPDP($cleanupStore.country.locale, products);
			console.log({ result });
			const apiUrl = '/api/ai/product-metadata';
			const options: RequestInit = {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ products: result })
			};
			console.log('before fetch');
			const response = await fetch(apiUrl, options);
			const { data, message, status } = (await response.json()) as iResult;

			console.log('after fetch');

			if (status === 'error') {
				console.log({ message });
				toast.error(message);
			} else {
				console.log({ message, success: 1 });
				const pieces = data.split('=>');
				const metadatas = pieces.map((piece: any) => {
					const json = Finder.extractJson(piece)[0] as Record<string, any>;
					console.log({ json })
					return json?.metadata ?? undefined;
				}) as any[];

				console.log({ metadatas });
				metadatas.forEach((metadata) => {
					if (metadata) {
						const obj = $cleanupStore.jumia[metadata.sku];
						$cleanupStore.jumia[metadata.sku] = { ...obj, metadata };
					}
				});
				toast.success(message);
			}
		} catch (error: any) {
			console.trace(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex flex-col gap-2">
	<h2 class="text-muted-foreground">Product Cleanup</h2>
	<div class="h-10"></div>

	<Button {onclick} disabled={loading}>
		{#if loading}
			<SpinLoader />
			<span>Loading...</span>
		{:else}
			<PackageSearchIcon />
			<span>Get Metadata</span>
		{/if}
	</Button>
</div>
