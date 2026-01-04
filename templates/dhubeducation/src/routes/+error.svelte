<script lang="ts">
	import { page } from '$app/state';
	import Binoculars from '$lib/components/icons/Binoculars.svelte';
	import { Button } from '$lib/components/ui/button';
</script> 
 
<div class="flex items-center justify-center h-screen w-full">
	<div class="flex flex-col items-center gap-2">
		<Binoculars />
		<h1 class="text-2xl font-semibold">{page.status}: {page.error?.message}</h1>
		<Button href="/">Homepage 👉</Button>
	</div>
</div>
