<script lang="ts">
	import type { iService } from '$lib/interface';
	import { cn } from '$lib/utils';
	import Servicecard from '../frontend/cards/Servicecard.svelte';

	interface Props {
		services: iService[];
		class?: string;
	}

	let { services, class: className }: Props = $props();

	const length = $state(services.length + 1);
</script>

<div
	class={cn(
		'grid w-full grid-cols-1 gap-4 text-center md:grid-cols-2 md:px-0 lg:grid-cols-3',
		className
	)}
>
	{#each services.slice(0, length) as service, i}
		<Servicecard {service} />
	{/each}
</div>
