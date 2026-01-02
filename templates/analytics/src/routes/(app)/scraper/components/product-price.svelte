<script lang="ts">
	import Jumia from '$lib/components/icons/competitors/Jumia.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import type { iFlattenedSKU } from '$lib/interface';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();
</script>

<div class="flex flex-col items-start justify-start gap-2">
	<Jumia />
	<div class="flex flex-col">
		<p class="text-lg font-medium">{sku.price}</p>
		{#if sku.oldPrice}
			<p class="text-muted-foreground line-through">{sku.oldPrice}</p>
		{/if}
	</div>
	{#if sku.discount}
		<Badge
			class="rounded-lg bg-jumia-font-color text-white dark:bg-white dark:text-jumia-font-color"
			>{sku.discount}</Badge
		>
	{/if}
</div>
