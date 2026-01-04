<!--
	Installed from github/TnTSpace/registry
-->

<script lang="ts">
	import RevealSlide from './reveal-slide.svelte';
	import type { iPresentation } from './types';

	interface Props {
		presentations: iPresentation[];
	}

	let { presentations }: Props = $props();
</script>

{#each presentations as presentation, i}
	<RevealSlide {presentation} />
{/each}
