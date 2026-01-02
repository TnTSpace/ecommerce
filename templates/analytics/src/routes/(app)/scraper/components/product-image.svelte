<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Finder } from '$lib/hooks/finder.svelte';
	import type { iFlattenedSKU } from '$lib/interface';
	import { skuStore } from '$lib/stores';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();
  const href = Finder.getUrl($skuStore.country.locale, sku.url)
</script>

<a {href} target="_blank">
	<Avatar.Root class="size-20 rounded-lg">
		<Avatar.Image src={sku.image} alt="@shadcn" />
		<Avatar.Fallback>{sku.name[0]}{sku.name[1]}</Avatar.Fallback>
	</Avatar.Root>
</a>
