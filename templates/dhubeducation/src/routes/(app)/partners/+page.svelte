<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iPartner, iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import Partners from '$lib/components/lists/Partners.svelte';
	import { page } from '$app/state';
	import CardSkeleton from '$lib/components/skeletons/CardSkeleton.svelte';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Partner | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/partners',
		keywords: [
			'partners',
			'study',
			'abroad',
			'education',
			'international',
			'masters',
			'first degree'
		]
	};
</script>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>

{#await data.getPartners}
	<CardSkeleton class="center" />
{:then result}
	{@const partners = result.data as iPartner[]}
	<Partners class="center" {partners} />
{:catch error}
	<AlertWidget
		variant="destructive"
		message={error.message}
		title="Error loading partners"
		href={page.url.pathname}
		linkText="Reload"
	/>
{/await}
