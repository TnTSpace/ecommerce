<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { iCampaign } from '$lib/interface'; 
	import Campaigncard from '$lib/components/backend/cards/Campaigncard.svelte';

	interface Props {
		list: iCampaign[];
		maxScrollItems?: number;
		class?: string;
	}

	let { list, maxScrollItems = 12, class: className }: Props = $props();

	let listRef: HTMLElement;
	let observer: IntersectionObserver;

	let listStore: Writable<any[]> = writable([]);

	const loadMore = () => {
		const lastIdx = $listStore.length;
		const endIdx = lastIdx + maxScrollItems;
		return list.slice(lastIdx, endIdx);
	};

	const observation = (entries: IntersectionObserverEntry[]) => {
		const entry = entries[0];
		if (!entry.isIntersecting) return;

		$listStore = [...$listStore, ...loadMore()];
	};

	$effect(() => {
		$listStore = list.slice(0, maxScrollItems);
	});

	$effect(() => {
		observer && observer.observe(listRef);
	});

	const initObserver = () => {
		const options = { threshold: 0.8 };
		observer = new IntersectionObserver(observation, options);
		observer.observe(listRef);
	};

	onMount(() => {
		initObserver();
	});

	onDestroy(() => {
		observer && observer.unobserve(listRef);
	});

	const onview = (id: string) => {};

	const onedit = (id: string) => {
		location.href = `/admin/campaigns/${id}`;
	};

</script>

<div class={className}>
	{#each $listStore as item, i}
		<Campaigncard {onview} {onedit} campaign={item} />
	{/each}
	<div bind:this={listRef}></div>
</div>
