<script lang="ts">
	import type { iGenericCompetitor, TCompetitor } from '$lib/interface';
	import CompetitorCard from '../cards/CompetitorCard.svelte';
	import { competitorStore, skuStore } from '$lib/stores';
	import { getCompetitorKey } from '$lib/fxns';

	interface Props {
		competitors: iGenericCompetitor[];
	}

	let { competitors=$bindable([]) }: Props = $props();
	function removeKey<T extends object, K extends keyof any>(obj: T, key: K): Omit<T, K> {
		const { [key]: _, ...rest } = obj;
		return rest;
	}

	// const result = removeKey({ a: 1, b: 2, c: 3 }, 'b');
	const ondelete = (competitor: iGenericCompetitor) => {
		const key = getCompetitorKey(competitor);
		$competitorStore = removeKey($competitorStore, key);
		competitors = competitors.filter(c => getCompetitorKey(c) !== key);
		console.log(`Deleted competitor with key: ${key}`);
	};
</script>

{#key $competitorStore}
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
		{#each competitors as competitor, i}
			<CompetitorCard {ondelete} {competitor} />
		{/each}
	</div>
{/key}
