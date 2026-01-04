<script lang="ts">
	import type { iService } from '$lib/interface';
	import Services from '../lists/Services.svelte';
	import { Button } from '../ui/button';

	interface Props {
		services: iService[];
		length?: number;
		showSeeAll?: boolean;
	}

	let { services, length, showSeeAll = true }: Props = $props();
</script>

<section>
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2">
			<h2 class="mb-4 text-3xl font-bold">Our Services</h2>
			<p class="mb-8">Explore our tailored solutions for your educational journey!</p>
		</div>
		<Services {services} />
		{#if showSeeAll}
			<Button href="/services" class="w-full md:w-fit">All Services</Button>
		{/if}
	</div>
</section>
