<script lang="ts">
	import Select, { type iSelectItem } from '../ui/select/select.svelte';
	import { modalStore, skuStore, cleanupStore, competitorStore } from '$lib/stores';
	import { FindByEnum } from '$lib/constants';
	import FindByComponent from '../sku/FindByComponent.svelte';
	import { Input } from '../ui/input';
	import { Textarea } from '../ui/textarea';
	import { Button } from '../ui/button';
	import { Label } from '../ui/label';
	import { cn } from '$lib/utils';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { finder } from '$lib/hooks/finder.svelte';
	import { SearchIcon } from 'lucide-svelte';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import type { iCountry, iSKU, iGenericCompetitor, TCountryLocale } from '$lib/interface';
	import StatusTable from '../widgets/StatusTable.svelte';
	import { getCompetitors, supabase } from '$lib/client/supabase';
	import { getCompetitorKey } from '$lib/fxns';

	interface Props {
		type: 'competition' | 'cleanup';
	}

	let { type }: Props = $props();

	const getStore = (type: 'competition' | 'cleanup') => {
		switch (type) {
			case 'competition':
				return skuStore;
			case 'cleanup':
				return cleanupStore;
		}
	};

	let store = $state(getStore(type));

	let findBy = $state(FindByEnum.URL);
	let loading = $state(false);
	const urlPlaceHolder = 'Jumia URL e.g. https://www.jumia.com.ng/catalog';
	const skusPlaceHolder = `Enter SKUs separated by new line or comma. E.g: NI930ST23IVW4NAFAMZ,GE779EA4NZXXGNAFAMZ`;

	const obtainList = (skus: string) => {
		const listVertical = skus
			.split('\n')
			.map((sku) => sku.trim())
			.filter((sku) => sku.length > 0);
		const listHorizontal = skus
			.split(',')
			.map((sku) => sku.trim())
			.filter((sku) => sku.length > 0);

		const list = [...new Set([...listVertical, ...listHorizontal])];

		return list;
	};
	const setCompetitorStore = (data: iGenericCompetitor) => { 
		const key = getCompetitorKey(data);
		$competitorStore = { ...$competitorStore, [key]: data };
	};
	const getJumia = async (list: iSKU[]) => {
		let jumia: Record<string, iSKU> = {};

		for (const item of list) {
			if (item.sku) {
				jumia[item.sku] = item;
			} else {
				console.warn('Item without SKU:', item);
			}
		}
		return { jumia };
	};

	const getByUrl = async (url: string, page: number) => {
		const locale = new URL(url).hostname.replace('www.jumia', '') as TCountryLocale;
		const country = [
			{
				name: 'Nigeria',
				code: 'ng',
				locale: '.com.ng'
			},
			{
				name: 'Egypt',
				code: 'eg',
				locale: '.com.eg'
			},
			{
				name: "Côte d'Ivoire",
				code: 'ci',
				locale: '.ci'
			},
			{
				name: 'Uganda',
				code: 'ug',
				locale: '.ug'
			},
			{
				name: 'Kenya',
				code: 'ke',
				locale: '.co.ke'
			},
			{
				name: 'Senegal',
				code: 'sn',
				locale: '.sn'
			},
			{
				name: 'Morocco',
				code: 'ma',
				locale: '.ma'
			},
			{
				name: 'Ghana',
				code: 'gh',
				locale: '.com.gh'
			},
			{
				name: 'Algeria',
				code: 'dz',
				locale: '.com.dz'
			}
		].filter((country) => country.locale === locale)[0];
		$store.country = country as iCountry;
		store.reset($store);

		const result = await finder.findProductsByUrl(url, page);
		const { jumia } = await getJumia(result);

		$store = { ...$store, url, page, jumia };
	};

	const getBySkus = async (skus: string) => {
		const locale = $store.country.locale;

		const country = [
			{
				name: 'Nigeria',
				code: 'ng',
				locale: '.com.ng'
			},
			{
				name: 'Egypt',
				code: 'eg',
				locale: '.com.eg'
			},
			{
				name: "Côte d'Ivoire",
				code: 'ci',
				locale: '.ci'
			},
			{
				name: 'Uganda',
				code: 'ug',
				locale: '.ug'
			},
			{
				name: 'Kenya',
				code: 'ke',
				locale: '.co.ke'
			},
			{
				name: 'Senegal',
				code: 'sn',
				locale: '.sn'
			},
			{
				name: 'Morocco',
				code: 'ma',
				locale: '.ma'
			},
			{
				name: 'Ghana',
				code: 'gh',
				locale: '.com.gh'
			},
			{
				name: 'Algeria',
				code: 'dz',
				locale: '.com.dz'
			}
		].filter((country) => country.locale === locale)[0];

		$store.country = country as iCountry;
		store.reset($store);

		const list = obtainList(skus);
		const result = await finder.findProductBySkus(list);
		const { jumia } = await getJumia(result);

		$store = { ...$store, jumia };
	};

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.target as HTMLFormElement);
		const url = formData.get('url') as string;
		const skus = formData.get('skus') as string;
		const page = Number(formData.get('page') as string) || 1;

		loading = true;
		if (findBy === FindByEnum.URL && url) {
			await getByUrl(url, page);
		} else if (findBy === FindByEnum.SKU && skus) {
			await getBySkus(skus);
		}

		$competitorStore = {};
		const competitors = await getCompetitors($skuStore.country.code)
		competitors.forEach(setCompetitorStore);
		$modalStore = { ...$modalStore, open: false };
		loading = false;
	};

	const countryOptions: iSelectItem[] = [
		{
			name: 'Nigeria',
			code: 'ng',
			locale: '.com.ng'
		},
		{
			name: 'Egypt',
			code: 'eg',
			locale: '.com.eg'
		},
		{
			name: "Côte d'Ivoire",
			code: 'ci',
			locale: '.ci'
		},
		{
			name: 'Uganda',
			code: 'ug',
			locale: '.ug'
		},
		{
			name: 'Kenya',
			code: 'ke',
			locale: '.co.ke'
		},
		{
			name: 'Senegal',
			code: 'sn',
			locale: '.sn'
		},
		{
			name: 'Morocco',
			code: 'ma',
			locale: '.ma'
		},
		{
			name: 'Ghana',
			code: 'gh',
			locale: '.com.gh'
		},
		{
			name: 'Algeria',
			code: 'dz',
			locale: '.com.dz'
		}
	].map((country) => ({
		label: country.name,
		value: country.locale
	}));
</script>

<form {onsubmit} class="grid grid-cols-1 gap-4 p-1">
	<div class="flex items-center justify-between gap-4">
		<Label>Find Product By <span class="uppercase">{findBy}</span></Label>
		<FindByComponent bind:findBy />
	</div>
	{#if findBy === FindByEnum.URL}
		<div class="flex flex-col gap-1">
			<Input
				name="url"
				required
				placeholder={urlPlaceHolder}
				bind:value={$store.url}
				class={removeRingClasses()}
			/>
			<div>
				<Label class="text-sm text-muted-foreground">Enter Page Number</Label>
				<Input
					type="number"
					name="page"
					min="1"
					max="100"
					bind:value={$store.page}
					class={cn('w-full', removeRingClasses())}
				/>
			</div>
		</div>
	{:else}
		<Select
			bind:value={$store.country.locale}
			name="country"
			options={[...countryOptions]}
			class={removeRingClasses()}
		/>
		<Textarea
			name="skus"
			required
			placeholder={skusPlaceHolder}
			class={cn('resize-none', removeRingClasses())}
			rows={5}
		/>
	{/if}
	<Button type="submit" class="w-full md:w-fit" disabled={loading}>
		{loading ? 'Loading...' : 'Find Product'}
		{#if loading}
			<SpinLoader />
		{:else}
			<SearchIcon />
		{/if}
	</Button>
</form>
<StatusTable />
