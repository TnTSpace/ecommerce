<script lang="ts">
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	class={cn('size-4', className)}
	fill="currentColor"><path d="M17 11V4H19V21H17V13H7V21H5V4H7V11H17Z"></path></svg
>
