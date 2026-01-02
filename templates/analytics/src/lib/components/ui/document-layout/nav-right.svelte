<script lang="ts">
	import { TextIcon } from 'lucide-svelte';
	import NavRightItems from './nav-right-items.svelte';
</script>

<div
	data-toc=""
	class="sticky top-0 flex h-dvh w-[220px] flex-col gap-4 pt-4 max-lg:hidden xl:w-[260px]"
>
	<h3 class="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
		<TextIcon class="size-4" />
		<span>On this page</span>
	</h3>

	<NavRightItems />
</div>
