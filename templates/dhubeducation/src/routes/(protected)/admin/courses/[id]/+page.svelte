<script lang="ts">
	import CourseForm from '$lib/components/forms/CourseForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const course = data.course
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<CourseForm {course} />
		</div>
	</div>
</Admin>