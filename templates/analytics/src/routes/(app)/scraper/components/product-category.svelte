<script lang="ts">
	import type { iFlattenedSKU } from '$lib/interface';
	import { MoveDownIcon } from 'lucide-svelte';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();

	const categories = sku.category.split('>>');
</script>

<div class="flex items-center gap-1">
	<MoveDownIcon />
	<div class="flex flex-col gap-0.5">
		{#each categories as category, i}
			<p>{category}</p>
		{/each}
	</div>
</div>
