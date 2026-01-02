<script lang="ts">
	import type { iSKU } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { skuStore } from '$lib/stores';
	import JumiaGlobal from '$lib/components/icons/JumiaGlobal.svelte';
	import Rating from '$lib/components/icons/Rating.svelte';
	import JumiaExpress from '$lib/components/icons/JumiaExpress.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import Tooltip from '$lib/components/ui/tooltip/tooltip.svelte';
	import { Trash2Icon, CopyIcon } from 'lucide-svelte';
	import { onCopy } from '@toolsntuts/utils';
	import { toast } from 'svelte-sonner';
	import SpinLoader from '$lib/components/ui/spin-loader/spin-loader.svelte';
	import { DisplayType } from '$lib/constants';
	import { copyText } from '$lib/client';

	interface Props {
		class?: string;
		product: iSKU;
	}

	let { class: className, product }: Props = $props();

	let isCopying = $state<boolean>(false);

	let domain = $derived(`https://www.jumia${$skuStore.country.locale}`);
	let href = $derived(`${domain}${product.url}`);
	let hasBadge = $state(product.badges?.main || product.shopGlobal);

	const defaultClasses =
		'w-full overflow-hidden rounded-lg shadow-jumia bg-white dark:bg-secondary relative';

	const defaultClassesList =
		'w-full overflow-hidden rounded-lg shadow-jumia bg-white dark:bg-secondary relative grid grid-cols-[128px_1fr] md:grid-cols-[148px_1fr]';

	const categoryInitial = (category: string) => {
		const pieces = category
			.split(' ')
			.map((word) => word[0])
			.join('');
		return pieces;
	};

	const handleCopy = async () => {
		isCopying = true;
		await copyText(product.sku);
		isCopying = false;
	};

	const handleDelete = () => {
		const id = product.sku;
		const json = { ...$skuStore.jumia };
		delete json[id];

		$skuStore.jumia = json;

		console.log({ deleted: id });
		console.log({ $skuStore, len: Object.keys($skuStore.jumia).length });
	};
</script>

{#if $skuStore.displayType === DisplayType.GRID}
	<article class={cn(defaultClasses, className)}>
		<a {href} target="_blank" class="relative flex aspect-square w-full">
			{#if product.badges?.campaign}
				{#if product.badges.campaign.image}
					<img
						class="absolute left-2 top-2 h-[18px] w-[138px]"
						src={product.badges.campaign.image}
						alt={product.badges.campaign.name}
					/>
				{:else}
					<span
						class="absolute left-2 top-2 block items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded px-1 text-[10px] font-semibold"
						style={`background-color:${product.badges.campaign.bgColor};color:${product.badges.campaign.txtColor}`}
						>{product.badges.campaign.name}</span
					>
				{/if}
			{/if}
			{#if product.prices.discount}
				<span
					class="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-white"
					>-{product.prices.discount}</span
				>
			{/if}
			<img src={product.image} class="w-full" alt={product.displayName} />
		</a>
		<div class="flex flex-col gap-2 p-2">
			<div class="flex flex-col items-start gap-1">
				{#if hasBadge}
					<div class="flex items-center gap-2">
						{#if product.badges?.main}
							<small
								class="text-2xs flex h-[18px] items-center justify-center rounded bg-officialstores px-1 font-medium text-white dark:bg-white dark:text-officialstores"
								>{product.badges.main.name}</small
							>
						{/if}
						{#if product.shopGlobal}
							<JumiaGlobal class="text-2xs h-[18px] px-1" name={product.shopGlobal.name} />
						{/if}
						<small
							class="text-2xs flex h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color md:hidden"
							>{categoryInitial(product.categories[0])}</small
						>
						<small
							class="text-2xs hidden h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color md:flex"
							>{product.categories[0]}</small
						>
					</div>
				{:else}
					<small
						class="text-2xs flex h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color"
						>{product.categories[0]}</small
					>
				{/if}
			</div>
			<h3 class="line-clamp-2 h-8 text-xs">{product.displayName}</h3>
			<div class="flex w-full items-baseline justify-start gap-2 leading-[1]">
				<div class="font-semibold">{product.prices.price}</div>
				{#if product?.prices?.oldPrice}
					<div class="text-[10px] font-semibold text-muted-foreground line-through">
						{product.prices.oldPrice}
					</div>
				{/if}
			</div>
			<div class="flex flex-col justify-between md:flex-row">
				{#if product.rating}
					<Rating starRating={Math.round(product.rating.average)} />
				{/if}
				{#if product.isShopExpress}
					<JumiaExpress class="w-[110px]" />
				{/if}
			</div>
			<Separator class="bg-muted-foreground/10" />
			<div class="flex items-center justify-end gap-2">
				<Tooltip
					onclick={handleCopy}
					description="Copy product SKU"
					size="icon"
					disable={isCopying}
				>
					{#if isCopying}
						<SpinLoader />
					{/if}
					{#if !isCopying}
						<CopyIcon />
					{/if}
				</Tooltip>
				<Tooltip onclick={handleDelete} description="Delete Product" size="icon">
					<Trash2Icon />
				</Tooltip>
			</div>
		</div>
	</article>
{/if}

{#if $skuStore.displayType === DisplayType.LIST}
	<article class={cn(defaultClassesList, className)}>
		<a {href} target="_blank" class="relative flex aspect-square w-full">
			{#if product.badges?.campaign}
				{#if product.badges.campaign.image}
					<img
						class="absolute left-2 top-2 h-[18px] w-[138px]"
						src={product.badges.campaign.image}
						alt={product.badges.campaign.name}
					/>
				{:else}
					<span
						class="absolute left-2 top-2 block w-[90%] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded px-1 text-[10px] font-semibold md:w-fit"
						style={`background-color:${product.badges.campaign.bgColor};color:${product.badges.campaign.txtColor}`}
						>{product.badges.campaign.name}</span
					>
				{/if}
			{/if}
			{#if product.prices.discount}
				<span
					class="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-white"
					>-{product.prices.discount}</span
				>
			{/if}
			<img src={product.image} class="w-full" alt={product.displayName} />
		</a>
		<div class="flex flex-col gap-2 p-2 pb-0">
			<div class="flex flex-col items-start gap-1">
				{#if hasBadge}
					<div class="flex items-center gap-2">
						{#if product.badges?.main}
							<small
								class="text-2xs flex h-[18px] items-center justify-center rounded bg-officialstores px-1 font-medium text-white dark:bg-white dark:text-officialstores"
								>{product.badges.main.name}</small
							>
						{/if}
						{#if product.shopGlobal}
							<JumiaGlobal class="text-2xs h-[18px] px-1" name={product.shopGlobal.name} />
						{/if}
						<small
							class="text-2xs flex h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color md:hidden"
							>{categoryInitial(product.categories[0])}</small
						>
						<small
							class="text-2xs hidden h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color md:flex"
							>{product.categories[0]}</small
						>
					</div>
				{:else}
					<small
						class="text-2xs flex h-[18px] items-center justify-center rounded bg-jumia-font-color px-1 font-medium text-white dark:bg-white dark:text-jumia-font-color"
						>{product.categories[0]}</small
					>
				{/if}
			</div>
			<h3 class="line-clamp-2 h-8 text-xs">{product.displayName}</h3>
			<div class="flex w-full items-baseline justify-start gap-2 leading-[1]">
				<div class="font-semibold">{product.prices.price}</div>
				{#if product?.prices?.oldPrice}
					<div class="text-[10px] font-semibold text-muted-foreground line-through">
						{product.prices.oldPrice}
					</div>
				{/if}
			</div>
			<div class="flex flex-col justify-between md:flex-row">
				{#if product.rating}
					<Rating starRating={Math.round(product.rating.average)} />
				{/if}
				{#if product.isShopExpress}
					<JumiaExpress class="w-[110px]" />
				{/if}
			</div>
			<Separator class="mt-auto bg-muted-foreground/10" />
		</div>
		<div class="col-span-2 flex items-center justify-end gap-2 p-2">
			<Tooltip onclick={handleCopy} description="Copy product SKU" size="icon" disable={isCopying}>
				{#if isCopying}
					<SpinLoader />
				{/if}
				{#if isCopying}
					<CopyIcon />
				{/if}
			</Tooltip>
			<Tooltip onclick={handleDelete} description="Delete Product" size="icon">
				<Trash2Icon />
			</Tooltip>
		</div>
	</article>
{/if}
