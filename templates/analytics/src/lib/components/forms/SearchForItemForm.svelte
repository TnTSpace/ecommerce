<script lang="ts">
	import { modalStore } from '$lib/stores';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button';
	import { removeRingClasses } from '@toolsntuts/utils';
	import { finder } from '$lib/hooks/finder.svelte';
	import { PackagePlusIcon, SearchIcon } from 'lucide-svelte';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import type { iCountry, iSKU, ModalType, TCountryLocale } from '$lib/interface';
	import Select from '../ui/select/select.svelte';
	import type { iSelectItem } from '../ui/select/select.svelte';
	import { cn } from '$lib/utils';
	import { handleFindProduct } from '$lib/client';

	interface Props {
		store: any;
		type: ModalType
	}

	let { store, type }: Props = $props()

	let loading = $state(false);

	const getJumia = (list: iSKU[]) => {
		let jumia: Record<string, iSKU> = {};
		list.forEach((product) => {
			jumia[product.sku] = product;
		});
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
		const { jumia } = getJumia(result);

		$store = { ...$store, url, page, jumia };
	};

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.target as HTMLFormElement);
		const term = formData.get('term') as string;
		const url = `https://www.jumia${$store.country.locale}/catalog/?q=${term}`;
		const page = Number(formData.get('page') as string) || 1;

		loading = true;
		await getByUrl(url, page);
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

	// const handleFindProduct = () => {
	// 	modalStore.set({
	// 		open: true,
	// 		type,
	// 		title: 'Find Product',
	// 		description: 'Find product(s) by url or skus.',
	// 		className: 'w-full max-w-2xl'
	// 	});
	// };
</script>

<form {onsubmit} class="grid grid-cols-1 gap-1 bg-white dark:bg-secondary rounded-lg shadow-jumia p-2">
	<h2 class="text-muted-foreground text-sm">Jumia Product Search</h2>
	<div class="grid w-full grid-cols-1 gap-2">
		<Input
			name="term"
			required
			placeholder="Search for Product on Jumia"
			class={cn('w-full', removeRingClasses())}
		/>
		<div class="grid grid-cols-1 items-center gap-2 md:grid-cols-[1fr_1fr]">
			<Select
				bind:value={$store.country.locale}
				name="country"
				options={[...countryOptions]}
				class={cn('w-full', removeRingClasses())}
			/>
			<div class="grid grid-cols-2 gap-2 items-center">
				<Button type="submit" variant="outline" class="w-full items-center" disabled={loading}>
					{#if loading}
						<SpinLoader />
					{:else}
						<SearchIcon />
					{/if}
					<span>{loading ? 'Loading...' : 'Find'}</span>
				</Button>
				<Button onclick={() => handleFindProduct(type)} class="w-full items-center">
					<PackagePlusIcon class="size-4" />
					<span>Add</span>
				</Button>
			</div>
		</div>
	</div>
</form>
