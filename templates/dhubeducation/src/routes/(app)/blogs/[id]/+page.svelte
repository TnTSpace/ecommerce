<script lang="ts">
	import { Constants } from '$lib/constants';
	import { getDescription } from '$lib/fxns';
	import type { iFile } from '$lib/interface';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import Educational from '$lib/components/widgets/Educational.svelte';
	import { metaStore } from '$lib/stores';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const sections = data.sections;
	const blog = data.blog
	const pages = data.pages;

	$metaStore = {
		title: `${blog?.title} | DHUB Education`,
		description: getDescription(blog?.description as string),
		ogimage: (blog?.file as iFile)?.url,
		link: `${Constants.DOMAIN}/blogs/${blog?.xata_id}`,
		keywords: [blog?.title as string, blog?.description as string]
	};
</script>

<Educational
	{pages}
	title={blog?.title as string}
	offset={112}
	groupTitle="Our Blogs"
	{sections}
	url={page.url}
	lastUpdated={new Date().toLocaleDateString()}
	top="top-[112px]"
/>
