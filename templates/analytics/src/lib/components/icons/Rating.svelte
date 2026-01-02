<script lang="ts">
	import Star from './Star.svelte';

	export let starRating = 4;

	const num2List = (num: number) => {
		const list = [];

		for (let i = 0; i < num; i++) {
			list.push(i);
		}
		return list;
	};

	const aGreaterOrEqualToB = (a: number, b: number) => a >= b;
</script>

<div class="flex items-center justify-start gap-1">
	{#each num2List(5) as num}
		{#if aGreaterOrEqualToB(num, starRating)}
			<Star class="fill-jumia-rating-gray" />
		{:else}
			<Star class="fill-jumia-orange" />
		{/if}
	{/each}
</div>
