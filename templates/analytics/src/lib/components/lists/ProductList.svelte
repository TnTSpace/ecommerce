<script lang="ts">
	import type { iFilter, iSKU } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import ProductInfiniteList from './ProductInfiniteList.svelte';
	import { skuStore, filterStore, initialFilter } from '$lib/stores';
	import { getSKUs } from '$lib/fxns';
	import { CopyIcon, DownloadIcon, PackagePlusIcon } from 'lucide-svelte';
	import Tooltip from '../ui/tooltip/tooltip.svelte';
	import RestoreIcon from '../icons/RestoreIcon.svelte';
	import GridIcon from '../icons/GridIcon.svelte';
	import ListIcon from '../icons/ListIcon.svelte';
	import { handleFindProduct } from '$lib/client';
	import { DisplayType } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { Finder } from '$lib/hooks/finder.svelte';

	const getItems = (products: iSKU[], filter: iFilter) => {
		const filterJson: Record<string, any> = {};

		Object.keys(filter).forEach((key) => {
			if (filter.express) {
				filterJson.express = filter.express;
			}

			if (filter.search.length) {
				filterJson.search = filter.search;
			}

			if (filter.category.length) {
				filterJson.category = filter.category;
			}

			if (filter.tag.length) {
				filterJson.tag = filter.tag;
			}

			if (filter.brand.length) {
				filterJson.brand = filter.brand;
			}

			if (filter.discount !== '0') {
				filterJson.discount = filter.discount;
			}

			if (filter.rating !== '0') {
				filterJson.rating = filter.rating;
			}
		});

		const matchSearch = (product: iSKU, search: string) => {
			const categories = product.categories.join('');

			return (
				product.displayName.indexOf(search.toLowerCase()) !== -1 ||
				categories.indexOf(search.toLowerCase()) !== -1
			);
		};

		const matchBrand = (product: iSKU, brand: string) => {
			return product.brand.toLowerCase().indexOf(brand.toLowerCase()) !== -1;
		};

		const matchCategory = (product: iSKU, category: string) => {
			return product.categories[0].toLowerCase().indexOf(category.toLowerCase()) !== -1;
		};

		const matchTag = (product: iSKU, tag: string) => {
			return product.tags.toLowerCase().indexOf(tag.toLowerCase()) !== -1;
		};

		const matchExpress = (product: iSKU, express: boolean) => {
			return product?.isShopExpress === express;
		};

		const matchPrice = (product: iSKU, price: number[]) => {
			if (price.length < 2) {
				return false;
			}
			const productPrice = Finder.extractNumberFromPrice(product.prices.price);
			return productPrice >= price[0] && productPrice <= price[1];
		};

		const matchDiscount = (product: iSKU, discount: string) => {
			const pieces = discount.split('-');
			const value = product.prices.discount
				? Finder.extractNumberFromPrice(product.prices.discount)
				: 0;
			
			const condition = value >= Number(pieces[0]) && value <= Number(pieces[1]);
			return condition
		};

		const matchRating = (product: iSKU, rating: string) => {
			const pieces = rating.split('-');
			const value = product.rating ? product.rating.average : 0;
			return value >= Number(pieces[0]) && value <= Number(pieces[1]);
		};

		const items = products.filter((product) => {
			const conditions = Object.keys(filterJson).map((key) => {
				const value = filterJson[key];
				switch (key) {
					case 'search':
						return matchSearch(product, value);
					case 'category':
						return matchCategory(product, value);
					case 'tag':
						return matchTag(product, value);
					case 'express':
						return matchExpress(product, value);
					case 'brand':
						return matchBrand(product, value);
					case 'price':
						return matchPrice(product, value);
					case 'discount':
						return matchDiscount(product, value);
					case 'rating':
						return matchRating(product, value);
				}
			});

			const condition = conditions.reduce((acc, curr) => acc && curr, true);
			return condition;
		});

		return items;
	};

	let itemStore = $derived<iSKU[]>(getItems(getSKUs($skuStore.jumia), $filterStore));

	const onCopy = () => {
		const items = getItems(getSKUs($skuStore.jumia), $filterStore)
		console.log({ items })
	};

	const onRestore = () => $filterStore = initialFilter

	const onDownload = () => {};

	const toggleDisplayType = (type: DisplayType) => {
		$skuStore.displayType = type;
	};
</script>

<div class="flex flex-col gap-2 pb-[72px] md:gap-4">
	<div
		aria-label="sort"
		class="sticky top-16 z-[1] rounded-lg bg-white shadow-jumia dark:bg-secondary md:top-[72px]"
	>
		<div
			aria-label="filter-bar"
			class="flex items-center justify-between border-b p-2 dark:border-b-muted-foreground/10"
		>
			<h1 class="hidden md:inline-flex">Catalog</h1>
			<div class="flex items-center justify-center gap-2">
				<Tooltip
					onclick={() => handleFindProduct('competition')}
					description="Find Jumia Products"
					size="icon"
				>
					<PackagePlusIcon class="size-4" />
				</Tooltip>
				<Tooltip onclick={onCopy} description="Copy SKUs of current product selection" size="icon">
					<CopyIcon />
				</Tooltip>
				<Tooltip onclick={onRestore} description="Restore current product selection" size="icon">
					<RestoreIcon />
				</Tooltip>
				<Tooltip onclick={onDownload} description="Download current product selection" size="icon">
					<DownloadIcon />
				</Tooltip>
			</div>
		</div>
		<div aria-label="status" class="flex items-center justify-between p-2">
			<p class="text-sm text-muted-foreground">{itemStore.length} products found</p>
			<div class="flex items-center justify-center gap-1">
				<Tooltip
					onclick={() => toggleDisplayType(DisplayType.GRID)}
					description="Change product display to grid"
					variant="outline"
					size="icon"
					class={$skuStore.displayType === DisplayType.GRID
						? 'text-jumia-orange'
						: 'text-muted-foreground'}
				>
					<GridIcon />
				</Tooltip>

				<Tooltip
					onclick={() => toggleDisplayType(DisplayType.LIST)}
					description="Change product display to list"
					variant="outline"
					size="icon"
					class={$skuStore.displayType === DisplayType.LIST
						? 'text-jumia-orange'
						: 'text-muted-foreground'}
				>
					<ListIcon />
				</Tooltip>
			</div>
		</div>
	</div>
	{#key itemStore.length}
		<ProductInfiniteList
			list={itemStore}
			class={cn(
				'grid gap-2',
				$skuStore.displayType === DisplayType.LIST
					? 'grid-cols-1 md:gap-4 xl:grid-cols-2'
					: 'grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-3 xl:grid-cols-4'
			)}
		/>
	{/key}
</div>
