<script lang="ts">
	import type { iCampaign } from '$lib/interface';
	import Campaigncard from '$lib/components/frontend/cards/Campaigncard.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		campaigns: iCampaign[];
		length?: number;
		class?: string
	}

	let { campaigns, class: className }: Props = $props();

	const length = $state(campaigns.length + 1);
</script>

<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3", className)}>
	{#each campaigns.slice(0, length) as campaign, i}
		<Campaigncard {campaign} />
	{/each}
</div>
