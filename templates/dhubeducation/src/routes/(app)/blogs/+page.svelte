<script lang="ts">
	import { getDescription, getOgImage } from '$lib/fxns';
	import type { iBlog, iMeta } from '$lib/interface';
	import Hero from '$lib/components/sections/Hero.svelte';
	import type { PageData } from './$types';
	import Blogs from '$lib/components/lists/Blogs.svelte';
	import { page } from '$app/state';
	import CardSkeleton from '$lib/components/skeletons/CardSkeleton.svelte';
	import AlertWidget from '$lib/components/widgets/AlertWidget.svelte';
	import { metaStore } from '$lib/stores';

	let { data }: { data: PageData } = $props();
	const slider = data.slider;

	$metaStore = {
		title: 'Blogs | DHUB Education',
		description: getDescription(slider.subline),
		ogimage: getOgImage(slider.background),
		link: 'https://www.dhubeducation.com/blogs',
		keywords: ['blogs', 'study', 'abroad', 'education', 'international', 'masters', 'first degree']
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

{#await data.getBlogs}
	<CardSkeleton class="center" />
{:then result}
	{@const blogs = result.data as iBlog[]}
	<Blogs {blogs} class="center" />
{:catch error}
	<AlertWidget
		variant="destructive"
		message={error.message}
		title="Error loading blogs"
		href={page.url.pathname}
		linkText="Reload"
	/>
{/await}
