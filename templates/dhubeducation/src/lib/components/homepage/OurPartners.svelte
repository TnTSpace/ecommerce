<script lang="ts">
	import type { iPartner } from '$lib/interface';
	import Partners from '../lists/Partners.svelte';
	import { Badge } from '../ui/badge';
	import { Button } from '../ui/button';

	interface Props {
		partners: iPartner[];
		showSeeAll?: boolean;
	}

	let { partners, showSeeAll = true }: Props = $props();
</script>

<section class="bg-paper dark:bg-primary/5">
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2">
			<h2 class="mb-4 text-3xl font-bold">Our Partners</h2>
			<p class="mb-8">Discover the valued collaborations that drive our mission forward!</p>
		</div>
		<div class="relative">
			<Badge class="absolute top-2 right-2 rounded-full bg-red-700 text-white">Finance Partner</Badge>
			<img src="/partnership.webp" class="hidden md:block" alt="partnership" />
			<img src="/partnership-mobile.webp" class="md:hidden" alt="partnership" />
		</div>
		<Partners {partners} />
		{#if showSeeAll}
			<Button href="/partners" class="w-full md:w-fit">All Partners</Button>
		{/if}
	</div>
</section>
