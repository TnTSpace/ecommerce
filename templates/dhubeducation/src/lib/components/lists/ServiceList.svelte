<script lang="ts"> 
	import type { iService } from '$lib/interface';
	import pkg from 'lodash';
	import { writable, type Writable } from 'svelte/store';
	import { Button } from '$lib/components/ui/button';
	import Heading from '$lib/components/sections/Heading.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { getContext } from 'svelte';
	import ApiList from '$lib/components/widgets/APIList.svelte';
	import ServiceInfiniteList from './ServiceInfiniteList.svelte';
	import Search from '$lib/components/widgets/Search.svelte';
	const { debounce } = pkg;

	const items = getContext("services") as iService[]

	const filterKeys: (keyof iService)[] = ['name', 'xata_createdat', 'xata_updatedat', 'description', 'order', 'slug', 'content'];

	let itemsStore: Writable<iService[]> = writable(items);

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

	const href = `/admin/services/new`;
</script>

<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
	<Heading
		title={`Services (${$itemsStore.length})`}
		description="Manage services"
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
	<ServiceInfiniteList list={$itemsStore} class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" />
{/key}
<Heading title="API" description="API calls for Services" />
<Separator />
<ApiList entityName="services" entityIdName="serviceId" />
