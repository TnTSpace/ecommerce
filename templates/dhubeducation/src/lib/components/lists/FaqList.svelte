<script lang="ts"> 
	import type { iFaq } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { getContext } from 'svelte';
	import ApiList from '$lib/components/widgets/APIList.svelte';
	import FaqInfiniteList from './FaqInfiniteList.svelte';
	import Search from '$lib/components/widgets/Search.svelte';
	const { debounce } = pkg;

	interface Props {
		faqs: iFaq[]
	}

	let { faqs }: Props = $props()
	const items = faqs

	const filterKeys: (keyof iFaq)[] = ['category', 'xata_createdat', 'xata_updatedat', 'question', 'answer' ];

	let itemsStore: Writable<iFaq[]> = writable(items);

	let searchTerm = $state('');

	const filterItems = debounce((term: string) => {
		const lowercasedTerm = term.toLowerCase();
		$itemsStore = items.filter((item) =>
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

	const href = `/admin/faqs/new`;
</script>

<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
	<Heading
		title={`Faqs (${$itemsStore.length})`}
		description="Manage faqs"
	/>
	<div class="grid grid-cols-[1fr_auto] gap-2">
		<Search inputValue={searchTerm} {onkeyup} />
		<Button {href} class="size-10 sm:size-auto">
			<PlusIcon class="size-4" />
			<span class="hidden sm:flex">Add New</span>
		</Button>
	</div>
</div>

<Separator />

{#key $itemsStore.length}
	<FaqInfiniteList list={$itemsStore} class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" />
{/key}
<Heading title="API" description="API calls for Faqs" />
<Separator />
<ApiList entityName="faqs" entityIdName="faqId" />
