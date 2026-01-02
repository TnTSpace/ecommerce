<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<div class={className}>
	<div class="p-2 md:px-4 md:py-0">
		{@render children()}
	</div>
</div>
