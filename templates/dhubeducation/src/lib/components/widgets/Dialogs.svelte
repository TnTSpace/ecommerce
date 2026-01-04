<script lang="ts">
	import Newsletter from './Newsletter.svelte';
	import { popupStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { iCampaign } from '$lib/interface';
	import EventPopup from './EventPopup.svelte';

	interface Props {
		campaigns: iCampaign[];
	}

	let { campaigns }: Props = $props();

	let shouldShow = $derived($popupStore.date !== new Date().toLocaleDateString());
	const comingCampaigns = $derived(
		campaigns.filter((campaign) => +new Date(campaign.startDate) > +new Date())
	);

	onMount(() => {
		$popupStore = { ...$popupStore, open: shouldShow };
	});
</script>

{#if comingCampaigns.length}
	<EventPopup campaigns={comingCampaigns} />
{:else}
	<Newsletter />
{/if}
