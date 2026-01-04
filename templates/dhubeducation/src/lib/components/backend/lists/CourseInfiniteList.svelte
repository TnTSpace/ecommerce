<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { iCourse } from '$lib/interface'; 
	import Coursecard from '$lib/components/backend/cards/Coursecard.svelte';

	interface Props {
		list: iCourse[];
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
		location.href = `/admin/courses/${id}`;
	};

</script>

<div class={className}>
	{#each $listStore as item, i}
		<Coursecard {onview} {onedit} course={item} />
	{/each}
	<div bind:this={listRef}></div>
</div>
