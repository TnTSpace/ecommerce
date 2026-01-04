<script lang="ts">
	import type { iFile, iCourse } from '$lib/interface';
	import { Button } from '$lib/components/ui/button';
	import { ChevronRightIcon } from 'lucide-svelte';
	interface Props {
		course: iCourse;
	}

	let { course }: Props = $props();

	const { xata_id } = course;

	const src = `${(course.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset`;
	const href = `/courses/${xata_id}`;
</script>

<div
	aria-label={course.name}
	class="flex flex-col gap-2 space-y-2 overflow-hidden rounded-lg bg-white p-0 dark:bg-secondary"
>
	<Button
		{href}
		aria-label={course.title}
		class="aspect-video h-auto object-cover p-0 hover:bg-transparent"
	>
		<img {src} loading="lazy" alt={course.title} class="h-full w-full" />
	</Button>
	<div class="flex flex-col space-y-1 p-4 pt-0 text-start">
		<h2 class="sub-title line-clamp-1 w-full font-semibold">
			{course.name} ({course.title})
		</h2>
		<p class="line-clamp-2 w-full text-muted-foreground">{course.description}</p>
	</div>
	<Button {href} variant="link" class="items-center">
		<span>Read</span>
		<ChevronRightIcon class="size-4" />
	</Button>
</div>
