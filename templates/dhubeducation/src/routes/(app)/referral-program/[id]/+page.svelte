<script lang="ts">
	import { Constants } from '$lib/constants';
	import { getDescription } from '$lib/fxns';
	import type { PageServerData } from './$types';
	import { page } from '$app/state';
	import Educational from '$lib/components/widgets/Educational.svelte';
	import { metaStore } from '$lib/stores';

	interface Props {
		data: PageServerData;
	}

	let { data }: Props = $props();

	const sections = data.sections;
	const referral = data.referral
	const pages = data.pages;

	$metaStore = {
		title: `${referral?.type} | DHUB Education`,
		description: getDescription(referral?.caption as string),
		ogimage: referral?.landscapepic as string,
		link: `${Constants.DOMAIN}/referral-program/${referral?.xata_id}`,
		keywords: [referral?.type as string, referral?.caption as string]
	};
</script>

<Educational
	{pages}
	title={referral?.type as string}
	offset={112}
	groupTitle="Our Referrals"
	{sections}
	url={page.url}
	lastUpdated={new Date().toLocaleDateString()}
	top="top-[112px]"
/>
