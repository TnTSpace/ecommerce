<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg aria-label="List View" fill="currentColor" viewBox="0 0 24 24" class={cn('h-4 w-4', className)}
	><path
		d="M10 13a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h5zm9 3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm0-3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm-9-9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5zm9 3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5zm0-3a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2h5z"
	></path></svg
>
