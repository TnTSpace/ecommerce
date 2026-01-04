<script lang="ts">
	import type { iPartner } from '$lib/interface';
	import Partnercard from '$lib/components/frontend/cards/Partnercard.svelte';
	import { cn } from '$lib/utils';

	interface Props {
		partners: iPartner[];
		class?: string
	}

	let { partners, class: className }: Props = $props();

	const length = $state(partners.length + 1);
</script>

<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3 w-full", className)}>
	{#each partners.slice(0, length) as partner, i}
		<Partnercard {partner} />
	{/each}
</div>
