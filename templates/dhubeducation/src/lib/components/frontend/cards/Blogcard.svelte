<script lang="ts">
	import type { iFile, iBlog } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRightIcon } from 'lucide-svelte';
	interface Props {
		blog: iBlog;
	}

	let { blog }: Props = $props();

	const { xata_id } = blog;

	const src = `${(blog.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset`;

	const href = `/blogs/${xata_id}`;
</script>

<div
	aria-label={blog.title}
	class="flex flex-col gap-2 space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<Button
		{href}
		aria-label={blog.title}
		class="aspect-video h-auto overflow-hidden object-cover p-0 hover:bg-transparent"
	>
		<img {src} loading="lazy" alt={blog.title} class="h-full w-full" />
	</Button>
	<div class="flex flex-col space-y-1 p-4 pt-0 text-start">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{blog.title} ({blog.title})
		</h2>
		<p class="line-clamp-2 w-full text-muted-foreground">{blog.description}</p>
	</div>
	<Button {href} variant="link" class="items-center">
		<span>Read</span>
		<ChevronRightIcon class="size-4" />
	</Button>
</div>
