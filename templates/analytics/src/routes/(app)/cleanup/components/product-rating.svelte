<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import type { iFlattenedSKU } from '$lib/interface';

	interface Props {
		sku: iFlattenedSKU;
	}

	let { sku }: Props = $props();
</script>

{Number(sku?.totalRatings ?? 0).toLocaleString()}
