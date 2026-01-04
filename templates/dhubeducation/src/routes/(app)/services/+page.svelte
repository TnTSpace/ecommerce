<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageServerData } from './$types';
	import OurServices from '$lib/components/homepage/OurServices.svelte';
	import Services from '$lib/components/lists/Services.svelte';
	import { metaStore } from '$lib/stores';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const slider = data.slider;
	const services = data.services;

	$metaStore = {
		title: 'Services | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/services',
		keywords: ['study', 'abroad', 'education', 'international', 'masters', 'first degree']
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

{#if services.length}
	<Services {services} class="center" />
{/if}
