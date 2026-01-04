<script lang="ts">
	import type { Writable } from 'svelte/store';

	interface Props {
		element: Writable<Element>;
	}

  let { element }: Props = $props()
</script>

<div bind:this={$element}></div>