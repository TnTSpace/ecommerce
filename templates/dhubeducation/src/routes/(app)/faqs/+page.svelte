<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iFaq, iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageServerData } from './$types';
	import FaqsSkeleton from '$lib/components/skeletons/FaqsSkeleton.svelte';
	import { page } from '$app/state';
	import OurFaqs from '$lib/components/homepage/OurFaqs.svelte';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import Faqs from '$lib/components/lists/Faqs.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageServerData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'FAQs | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/faqs',
		keywords: ['faq', 'study', 'abroad', 'education', 'international', 'masters', 'first degree']
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

<div class="center">
	{#await data.getFaqs}
		<FaqsSkeleton />
	{:then result}
		{@const faqs = result.data as iFaq[]}
		<Faqs {faqs} />
	{:catch error}
		<AlertWidget
			variant="destructive"
			message={error.message}
			title="Error loading faqs"
			href={page.url.pathname}
			linkText="Reload"
		/>
	{/await}
</div>
