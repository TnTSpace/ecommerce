<script lang="ts">
	import Heading from '$lib/components/sections/Heading.svelte';
	import { Button } from '$lib/components/ui/button';
	import { PlusIcon, RefreshCcwDotIcon } from 'lucide-svelte';
	import type { PageServerData } from './$types';
	import { modalStore, refereesStore } from '$lib/stores';
	import { Separator } from '$lib/components/ui/separator';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { getColumns } from './column';
	import { flattenReferee, getRefereeData } from '$lib/fxns';
	import { Constants } from '$lib/constants';
	import { onMount } from 'svelte';

	let { data }: { data: PageServerData } = $props();

	const updateReferral = () => {
		$modalStore = {
			...$modalStore,
			open: true,
			data: data.referral,
			title: 'Update Profile',
			description: 'Fill the form below to update your referral profile',
			type: 'referral'
		};
	};

	const addReferee = () => {
		$modalStore = {
			...$modalStore,
			open: true,
			data: { referral: data.referral, referee: null },
			title: 'Add Referee',
			description: 'Fill the form below to add a new referee',
			type: 'referee'
		};
	};

	const columns = getColumns(modalStore, data.referral)

	const flattened = data.referees.map(flattenReferee)

	$refereesStore = data.referees
	onMount(() => {
		localStorage.removeItem(Constants.REDIRECT)

	})
</script>

<div class="flex h-full w-full flex-col gap-4 p-4">
	<Heading title={`Referral`} description="Update your profile to add referees" />
	<div class="flex items-center justify-center gap-2 md:justify-start">
		<Button variant={data.referral ? 'outline' : 'default'} onclick={updateReferral}>
			<RefreshCcwDotIcon class="size-4" />
			<span>Update Profile</span>
		</Button>

		<Button disabled={!data.referral} onclick={addReferee}>
			<PlusIcon class="size-4" />
			<span>Add Referee</span>
		</Button>
	</div>
	<Separator />
	<!-- <RefereeList referees={data.referees} referral={data.referral} /> -->

	<DataTable {columns} data={flattened} />
</div>
