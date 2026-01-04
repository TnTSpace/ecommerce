<script lang="ts">
	import Admin from '$lib/components/sections/Admin.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PlusIcon } from 'lucide-svelte';
</script>

<Admin>
	<div class="flex h-full w-full flex-col items-center justify-center gap-4">
		<div class="flex flex-col text-center leading-[1]">
			<h2 class="text-2xl font-semibold">Ready to Create Your AI Blog?</h2>
			<p class="text-muted-foreground">Click the button below to create one</p>
		</div>
		<Button href="/admin/blogs/create">
			Create Blog
			<PlusIcon class="size-4" />
		</Button>
	</div>
</Admin>
