<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iCampaign, iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import Campaigns from '$lib/components/lists/Campaigns.svelte';
	import { page } from '$app/state';
	import CardSkeleton from '$lib/components/skeletons/CardSkeleton.svelte';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Campaign | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/campaigns',
		keywords: [
			'campaigns',
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

{#await data.getCampaigns}
	<CardSkeleton class="center" />
{:then result}
	{@const campaigns = result.data as iCampaign[]}
	<Campaigns {campaigns} class="center" />
{:catch error}
	<AlertWidget
		variant="destructive"
		message={error.message}
		title="Error loading campaigns"
		href={page.url.pathname}
		linkText="Reload"
	/>
{/await}
