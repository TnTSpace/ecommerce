<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import { metaStore } from '$lib/stores';
	import Referrals from '$lib/components/lists/Referrals.svelte';
	import type { iReferral } from '$lib/interface';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;
	const referrals = data.referrals as iReferral[]

	$metaStore = {
		title: 'Referrals | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/referral-program',
		keywords: ['referrals', 'study', 'abroad', 'education', 'international', 'masters', 'first degree']
	};

	$effect(() => console.log({ data }))
</script>

<Hero
	options={{
		cta: false,
		title: slider.title,
		subline: [slider.subline],
		backgroundImage: slider.background
	}}
/>


<Referrals {referrals} class="center" />
