<script lang="ts">
	import type { iCourse } from '$lib/interface';
	import { cn } from '$lib/utils';
	import Coursecard from '../frontend/cards/Coursecard.svelte';

	interface Props {
		courses: iCourse[];
		class?: string;
	}

	let { courses, class: className }: Props = $props();

	const length = $state(courses.length + 1);
</script>

<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3 w-full", className)}>
	{#each courses.slice(0, length) as course, i}
		<Coursecard {course} />
	{/each}
</div>
