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
	const course = data.course
	const pages = data.pages;

	$metaStore = {
		title: `${course?.name} | DHUB Education`,
		description: getDescription(course?.description as string),
		ogimage: (course?.file as iFile)?.url,
		link: `${Constants.DOMAIN}/courses/${course?.xata_id}`,
		keywords: [course?.name as string, course?.description as string]
	};
</script>

<Educational
	{pages}
	title={course?.name as string}
	offset={112}
	groupTitle="Our Courses"
	{sections}
	url={page.url}
	lastUpdated="January 30, 2025"
	top="top-[112px]"
/>
