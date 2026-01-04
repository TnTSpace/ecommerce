<script lang="ts">
	import type { iReferral } from '$lib/interface';
	import { cn } from '$lib/utils';
	import Referralcard from '../frontend/cards/Referralcard.svelte';

	interface Props {
		referrals: iReferral[];
		class?: string;
	}

	let { referrals, class: className }: Props = $props();

	const length = $state(referrals.length + 1);
</script>

<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3 w-full", className)}>
	{#each referrals.slice(0, length) as referral, i}
		<Referralcard {referral} />
	{/each}
</div>
