<script lang="ts">
	import { Button } from '../ui/button';
	import { Input } from '../ui/input';
	import { skuStore, filterStore } from '$lib/stores';
	import type { iSKU } from '$lib/interface';
	import { Finder } from '$lib/hooks/finder.svelte';
	import { onMount } from 'svelte';

	const getMinMax = (store: Record<string, iSKU>): [number, number] => {
		const products = Object.values(store);
		const prices = products.map((product) => Finder.extractNumberFromPrice(product.prices.price));
		const min = Math.min(...prices);
		const max = Math.max(...prices);
		return [min, max];
	};

	let [min, max] = $derived(getMinMax($skuStore.jumia));

	const onMinInput = () => {

		if ($filterStore.price.min > $filterStore.price.max) {
			$filterStore.price.min = $filterStore.price.max;
		}
		
		// if ($filterStore.price.min < min) {
		// 	$filterStore.price.min = min;
		// }
	};

	const onMaxInput = () => {
		if ($filterStore.price.max < $filterStore.price.min) {
			$filterStore.price.max = $filterStore.price.min;
		}
		
		// if ($filterStore.price.max > max) {
		// 	$filterStore.price.max = max;
		// }
	};
</script>

<div class="*:not-first:mt-4 space-y-2">
	<div class="grid grid-cols-2 gap-2">
		<div class="flex flex-col gap-1">
			<span class="text-xs text-muted-foreground">Min: {min.toLocaleString()}</span>
			<Input
				class="peer w-full"
				type="number"
				inputmode="decimal"
				defaultvalue={min}
				oninput={onMinInput}
				bind:value={$filterStore.price.min}
				aria-label="Enter minimum price"
			/>
		</div>
		<div class="flex flex-col gap-1">
			<span class="text-xs text-muted-foreground">Max: {max.toLocaleString()}</span>
			<Input
				class="peer w-full"
				type="number"
				inputmode="decimal"
				defaultValue={max}
				oninput={onMaxInput}
				bind:value={$filterStore.price.max}
				aria-label="Enter maximum price"
			/>
		</div>
	</div>
	<Button class="w-full" variant="outline">
		Show items
	</Button>
</div>
