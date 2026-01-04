<script lang="ts">
	import Admin from '$lib/components/sections/Admin.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Admin>
	<h2>Homepage</h2>
</Admin>
