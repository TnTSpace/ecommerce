<script lang="ts">
	import type { iRoute } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()

	let routes: iRoute[] = [
		{
			href: '/',
			name: 'About'
		},
		{
			href: '/scraper',
			name: 'Scraper'
		},
		{
			href: '/catalog',
			name: 'Catalog'
		},
		// {
		// 	href: '/cleanup',
		// 	name: 'cleanup'
		// }
	];
</script>

<div class={cn("flex items-center gap-2", className)}>
	{#each routes as { name, href }, i}
		<Button {href} variant="outline" class="rounded-full capitalize">
			{name}
		</Button>
	{/each}
</div>
