<script lang="ts">
	import Rating from '$lib/components/icons/Rating.svelte';
	import Star from '$lib/components/icons/StarIcon.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Finder } from '$lib/hooks/finder.svelte';
	import type { iFlattenedSKU } from '$lib/interface';
	import { cleanupStore } from '$lib/stores';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();
  const href = Finder.getUrl($cleanupStore.country.locale, sku.url)
	
</script>

<a {href} target="_blank" class="flex flex-col items-center gap-2">
	<Avatar.Root class="size-20 rounded-lg">
		<Avatar.Image src={sku.image} alt="@shadcn" />
		<Avatar.Fallback>{sku.name[0]}{sku.name[1]}</Avatar.Fallback>
	</Avatar.Root>
	<div class="flex items-center gap-1">
		<!-- <Rating starRating={sku?.averageRatings ?? 0} />  -->
		 <Star class="fill-jumia-orange" />
		({sku.averageRatings})
	</div>
</a>
