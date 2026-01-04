<script lang="ts">
	import type { PageData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Admin>
	<h2>Settings</h2>
</Admin>
