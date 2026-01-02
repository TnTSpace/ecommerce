<script lang="ts" module>
	const getCompetitors = (store: Record<string, iGenericCompetitor>, sku: string) => {
		return Object.keys(store)
			.map((key) => {
				const competitor = store[key];
				return { competitor, key };
			})
			.filter((item) => item.key.indexOf(sku) > -1)
			.map((item) => item.competitor)
			.sort((a, b) => {
				const priceA = Number(a.price);
				const priceB = Number(b.price);
				return priceA - priceB;
			});
	};
</script>

<script lang="ts">
	import type { iFlattenedSKU, iGenericCompetitor, TCompetitor } from '$lib/interface';
	import { rCompetitors } from '$lib/constants';
	import { skuStore, modalStore } from '$lib/stores';
	import { Button } from '$lib/components/ui/button';
	import { BoxesIcon } from 'lucide-svelte';
	import { competitorStore } from '$lib/stores';

	interface Props {
		product: iFlattenedSKU;
	}

	let { product }: Props = $props();

	let cProduct = $derived($skuStore.jumia[product.sku]);

	const competitors = $derived(getCompetitors($competitorStore, product.sku));

	const getMinPrice = (products: any[]) => {
		const prices = products.map((kp) => Number(kp.price)).filter((price) => price > 0);
		const min = Math.min(...prices);
		return min;
	};

	const viewProducts = (type: string, id: string) => {
		modalStore.set({
			open: true,
			type: 'view-competition',
			title: `${type} Products`,
			description: `Find product(s) on ${type} similar to ${cProduct?.displayName}`,
			className: 'w-full max-w-4xl',
			data: competitors
		});
	};
</script>

<div class="flex flex-col gap-1">
	{#key competitors.length}
		{#if competitors.length === 0}
			<p class="text-sm text-muted-foreground">No competitors found for this product.</p>
		{:else}
			<p class="text-sm text-muted-foreground">
				Found {competitors.length}
				{competitors.length === 1 ? 'competitor' : 'competitors'} for this product.
			</p>
		{/if}
		{@const comp = competitors[0]}
		{#if comp}
			{@const { competitor, id } = comp}
			{@const key = competitor.toLowerCase() as TCompetitor}
			{@const rCompetitor = rCompetitors[key]}
			{@const Logo = rCompetitor?.logo ?? BoxesIcon}
			<Button
				onclick={() => viewProducts(competitor, id)}
				variant="outline"
				class="h-auto w-fit justify-start"
			>
				{getMinPrice(competitors).toLocaleString()}
				<Logo class="h-4" />
			</Button>
		{/if}
	{/key}
</div>
