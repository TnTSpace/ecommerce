<script lang="ts">
	import type { iBlog } from '$lib/interface';
	import { cn } from '$lib/utils';
	import Blogcard from '../frontend/cards/Blogcard.svelte';

	interface Props {
		blogs: iBlog[];
		class?: string;
	}

	let { blogs, class: className }: Props = $props();

	const length = $state(blogs.length + 1);
</script>

<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3 w-full", className)}>
	{#each blogs.slice(0, length) as blog, i}
		<Blogcard {blog} />
	{/each}
</div>
