<script lang="ts">
	import type { iBlog } from '$lib/interface';
	import Blogs from '../lists/Blogs.svelte';
	import { Button } from '../ui/button';

	interface Props {
		blogs: iBlog[];
		showSeeAll?: boolean;
	}

	let { blogs, showSeeAll = true }: Props = $props();
</script>

<section class="bg-paper dark:bg-primary/5">
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2">
			<h2 class="mb-4 text-3xl font-bold">Our Blogs</h2>
			<p class="mb-8">Stay informed with our recent posts!</p>
		</div>
		<Blogs {blogs} />
		{#if showSeeAll}
			<Button href="/blogs" class="w-full md:w-fit">All Blogs</Button>
		{/if}
	</div>
</section>
