<script lang="ts">
	import BlogForm from '$lib/components/forms/BlogForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const blog = data.blog;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<BlogForm {blog} />
		</div>
	</div>
</Admin>
