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
	const partner = data.partner
	const pages = data.pages;

	$metaStore = {
		title: `${partner?.name} | DHUB Education`,
		description: getDescription(partner?.country as string),
		ogimage: (partner?.file as iFile)?.url,
		link: `${Constants.DOMAIN}/partners/${partner?.xata_id}`,
		keywords: [partner?.name as string, partner?.country as string]
	};
</script>

<Educational
	{pages}
	title={partner?.name as string}
	offset={112}
	groupTitle="Our Partners"
	{sections}
	url={page.url}
	lastUpdated={new Date().toLocaleDateString()}
	top="top-[112px]"
/>
