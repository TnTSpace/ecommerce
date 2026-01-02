<script lang="ts">
	import { browser } from '$app/environment';
	import { getOptions } from '$lib/fxns';
	import { initialFilter, skuStore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import ExpressFilter from '../filters/ExpressFilter.svelte';
	import PriceFilter from '../filters/PriceFilter.svelte';
	import RatingFilter from '../filters/RatingFilter.svelte';
	import SearchSelect from '../filters/SearchSelect.svelte';
	import { Label } from '../ui/label';
	import { filterStore } from '$lib/stores';
	import DiscountFilter from '../filters/DiscountFilter.svelte';
	import { Button } from '../ui/button';
	import { Trash2Icon } from 'lucide-svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();

	let { categories, tags, brands } = $derived(getOptions($skuStore.jumia));

	let hasDiscount = $derived($filterStore.discount !== '0-100' && $filterStore.discount !== '0-0')
	let hasRating = $derived($filterStore.rating !== '0-5' && $filterStore.rating !== '0-0')
	let hasPrice = $derived($filterStore.price.min || $filterStore.price.max)

	const resetCategory = () => $filterStore.category = initialFilter.category
	const resetTag = () => $filterStore.tag = initialFilter.tag
	const resetBrand = () => $filterStore.brand = initialFilter.brand
	const resetExpress = () => $filterStore.express = initialFilter.express
	const resetDiscount = () => $filterStore.discount = initialFilter.discount
	const resetRating = () => $filterStore.rating = initialFilter.rating
	const resetPrice = () => $filterStore.price = initialFilter.price

</script>

<aside class={cn('flex flex-col gap-4', className)}>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Categories</Label>
			{#if $filterStore.category.length}
				<Button onclick={resetCategory} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<SearchSelect name="Category" bind:value={$filterStore.category} options={categories} />
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Tag</Label>
			{#if $filterStore.tag.length}
				<Button onclick={resetTag} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<SearchSelect name="Tag" bind:value={$filterStore.tag} options={tags} />
	</div>
	<div class="flex flex-col gap-1"> 
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Brand</Label>
			{#if $filterStore.brand.length}
				<Button onclick={resetBrand} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<SearchSelect name="Brand" bind:value={$filterStore.brand} options={brands} />
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Price</Label>
			{#if hasPrice}
				<Button onclick={resetPrice} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<PriceFilter />
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
		<Label class="text-sm text-muted-foreground">Rating</Label>
			{#if hasRating}
				<Button onclick={resetRating} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<RatingFilter bind:value={$filterStore.rating} />
	</div>
	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Express Delivery</Label>
			{#if $filterStore.express}
				<Button onclick={resetExpress} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<ExpressFilter bind:checked={$filterStore.express} />
	</div>

	<div class="flex flex-col gap-1">
		<div class="flex items-center justify-between h-8">
			<Label class="text-sm text-muted-foreground">Discount Percentage</Label>
			{#if hasDiscount}
				<Button onclick={resetDiscount} size="iconsm" class="bg-red-500/20 text-red-500" variant="outline">
					<Trash2Icon />
				</Button>
			{/if}
		</div>
		<DiscountFilter bind:value={$filterStore.discount} />
	</div>
</aside>
