<script lang="ts">
	import type { iFaq } from '$lib/interface';
	import { slugify } from '@toolsntuts/utils';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import Accordion from '$lib/components/widgets/Accordion.svelte';
	import { writable, type Writable } from 'svelte/store';
	import pkg from 'lodash';
	import Search from '$lib/components/widgets/Search.svelte';
	const { debounce } = pkg;

	interface Props {
		faqs: iFaq[];
	}
	let { faqs }: Props = $props();

	const filterKeys: (keyof iFaq)[] = [
		'question',
		'answer',
		'category',
		'xata_createdat',
		'xata_updatedat'
	];

	let itemsStore: Writable<iFaq[]> = writable(faqs);

	let searchTerm = $state('');

	const filterItems = debounce((term: string) => {
		const lowercasedTerm = term.toLowerCase();
		$itemsStore = faqs.filter((item) =>
			filterKeys.some((key) => {
				const childValue = item[key];
				return childValue?.toString().toLowerCase().includes(lowercasedTerm);
			})
		);
	}, 300);

	const onkeyup = (evt: Event) => {
		const term = (evt.target as HTMLInputElement).value;
		searchTerm = term;
		filterItems(term);
	};

	let grouped = $derived(
		Object.groupBy($itemsStore, ({ category }) => category) as Record<string, iFaq[]>
	);
</script>

<div class="flex flex-col gap-4 w-full">
	<Search inputValue={searchTerm} {onkeyup} class="w-full max-w-md self-center" />
	<ScrollArea class="grid h-80 w-full grid-cols-1 gap-4">
		{#each Object.keys(grouped).sort() as item, i}
			{@const category = item}
			{@const items = grouped[category].map((item) => ({
				id: slugify(item.question),
				title: item.question,
				description: item.answer
			}))}
			<div class="mx-auto flex w-full flex-col gap-2 pr-4">
				{#key items.length}
					<h2 class="mt-4 text-start text-lg font-semibold">{category}</h2>
					<Accordion {items} />
				{/key}
			</div>
		{/each}
	</ScrollArea>
</div>
