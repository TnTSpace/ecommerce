<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageServerData } from './$types';
	import { metaStore } from '$lib/stores';
	import ReviewSection from '$lib/components/homepage/ReviewSection.svelte';

	let { data }: { data: PageServerData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Reviews | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/reviews',
		keywords: [
			'reviews',
			'study',
			'abroad',
			'education',
			'international',
			'masters',
			'first degree',
			'study abroad'
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

<ReviewSection />
