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
	const campaign = data.campaign
	const pages = data.pages;

	$metaStore = {
		title: `${campaign?.title} | DHUB Education`,
		description: getDescription(campaign?.description as string),
		ogimage: (campaign?.file as iFile).url,
		link: `${Constants.DOMAIN}/campaigns/${campaign?.xata_id}`,
		keywords: [campaign?.title as string, campaign?.description as string]
	};
</script>


<Educational
	{pages}
	title={campaign?.title as string}
	offset={112}
	groupTitle="Our Campaigns"
	{sections}
	url={page.url}
	lastUpdated={new Date().toLocaleDateString()}
	top="top-[112px]"
/>
