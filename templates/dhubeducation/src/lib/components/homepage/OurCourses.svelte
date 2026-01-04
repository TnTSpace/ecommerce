<script lang="ts">
	import type { iCourse } from '$lib/interface';
	import Courses from '$lib/components/lists/Courses.svelte';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		courses: iCourse[];
		showSeeAll?: boolean;
	}

	let { courses, showSeeAll = true }: Props = $props();
</script>

<section class="bg-paper dark:bg-primary/5">
	<div class="mx-auto flex flex-col items-center gap-4 text-center center">
		<div class="space-y-2 flex flex-col items-center">
			<h2 class="mb-4 text-3xl font-bold">Our Courses</h2>
			<p class="mb-8">Pave your path to global education with our study abroad courses!</p>
			<p class="py-2 px-4 w-fit text-muted-foreground">🚨courses are for students in the UK</p>
		</div>
		<Courses {courses} />
		{#if showSeeAll}
			<Button href="/courses" class="w-full md:w-fit">All Courses</Button>
		{/if}
	</div>
</section>
