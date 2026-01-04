<script lang="ts">
	import { Constants } from '$lib/constants';
	import { getDescription } from '$lib/fxns';
	import type { iImage } from '$lib/interface';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import Educational from '$lib/components/widgets/Educational.svelte';
	import { metaStore } from '$lib/stores';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const sections = data.sections;
	const service = data.service
	const pages = data.pages;

	$metaStore = {
		title: `${service?.name} | DHUB Education`,
		description: getDescription(service?.description as string),
		ogimage: (service?.file as iImage).url,
		link: `${Constants.DOMAIN}/services/${service?.xata_id}`,
		keywords: [service?.name as string, service?.description as string]
	};
</script>

<Educational
	{pages}
	title={service?.name as string}
	offset={112}
	groupTitle="Our Services"
	{sections}
	url={page.url}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
