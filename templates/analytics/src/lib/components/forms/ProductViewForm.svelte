<script lang="ts">
	import type { iSKU } from '$lib/interface';
	import { Badge, CheckIcon, CopyIcon, ExternalLink } from 'lucide-svelte';
	import JumiaExpress from '../icons/JumiaExpress.svelte';
	import JumiaGlobal from '../icons/JumiaGlobal.svelte';
	import { Button } from '../ui/button';
	import { onCopy } from '@toolsntuts/utils';
	import { Finder } from '$lib/hooks/finder.svelte';
  import { skuStore } from '$lib/stores';

	interface Props {
		product: iSKU;
	}

	let copyLoading = $state(false);

	const handleClick = async () => {
		copyLoading = true;
		await onCopy(product.sku);
		setTimeout(() => {
			copyLoading = false;
		}, 1000);
	};

	let { product }: Props = $props();
  const href = Finder.getUrl($skuStore.country.locale, product.url)
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-[300px_1fr]">
	<div class="relative w-full">
		<img class="aspect-square w-full max-w-[300px]" src={product.image} alt={product.displayName} />
		<Button class="absolute right-2 top-2" size="icon" {href} target="_blank">
			<ExternalLink class="size-4" />
		</Button>
	</div>
	<Button disabled={copyLoading} variant="outline" onclick={handleClick} class="md:hidden">
		<span>{product.sku}</span>
		{#if copyLoading}
			<CheckIcon />
		{:else}
			<CopyIcon />
		{/if}
	</Button>
	<div class="flex flex-col gap-2">
		<p class="text-sm">{product.displayName}</p>
		<div class="relative flex flex-wrap items-center gap-1 space-x-1">
			{#if product.isShopExpress}
				<JumiaExpress class="w-[110px]" />
			{/if}
			{#if product.shopGlobal}
				<JumiaGlobal class="text-2xs px-1" name={product.shopGlobal.name} />
			{/if}

			{#if product?.badges?.main}
				<small
					class="text-2xs flex h-[18px] items-center justify-center rounded bg-officialstores px-1 font-medium text-white dark:bg-white dark:text-officialstores"
					>{product.badges.main.name}</small
				>
			{/if}
			{#if product?.badges?.campaign}
				{#if product?.badges?.campaign?.image}
					<img
						class="h-[18px] w-[138px]"
						src={product?.badges?.campaign?.image}
						alt={product?.badges?.campaign?.name}
					/>
				{:else}
					<span
						class="flex h-[18px] items-center justify-center rounded px-1 text-xs font-semibold"
						style={`background-color:${product?.badges?.campaign?.bgColor};color:${product?.badges?.campaign?.txtColor}`}
						>{product?.badges?.campaign?.name}</span
					>
				{/if}
			{/if}
		</div>
		<div class="flex items-start flex-col gap-2">
			<div class="flex flex-col">
				<p class="font-medium">{product.prices.price}</p>
				{#if product.prices.oldPrice}
					<p class="text-muted-foreground line-through text-sm">{product.prices.oldPrice}</p>
				{/if}
			</div>
			{#if product.prices.discount}
				<span
					class="rounded-lg bg-jumia-font-color px-2 py-1 text-sm font-bold text-white dark:bg-white dark:text-jumia-font-color"
					>{product.prices.discount}</span
				>
			{/if}
		</div>
		<Button disabled={copyLoading} variant="outline" onclick={handleClick} class="hidden md:flex mt-auto">
			<span>{product.sku}</span>
			{#if copyLoading}
				<CheckIcon />
			{:else}
				<CopyIcon />
			{/if}
		</Button>
	</div>
</div>
