<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/sections/Navbar.svelte';

	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<main class="max-w-10xl mx-auto">
	<Navbar user={data.user} />
	<div class="md:container p-4">
		{@render children()}
	</div>
	<div id="fetched" class="overflow-hidden hidden"></div>
	<iframe id="competition" title="competition"></iframe>
</main>
