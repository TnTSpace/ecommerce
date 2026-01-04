<script lang="ts">
	import CourseList from '$lib/components/backend/lists/CourseList.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const courses = data.courses;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<CourseList {courses} />
		</div>
	</div>
</Admin>
