<script lang="ts">
	import { onMount } from 'svelte';
	import { getCompetitors, supabase } from '$lib/client/supabase';
	import type {
		RealtimePostgresChangesPayload,
		RealtimePostgresInsertPayload
	} from '@supabase/supabase-js';
	import type { iGenericCompetitor, iSKU, TCountryCode } from '$lib/interface';
	import { competitorStore, skuStore } from '$lib/stores';
	import { getCompetitorKey, slugifyUrl } from '$lib/fxns';
	import { toast } from 'svelte-sonner';

	let { children } = $props();

	const setCompetitorStore = (data: iGenericCompetitor) => {
		const key = getCompetitorKey(data);
		$competitorStore = { ...$competitorStore, [key]: data };
	};

	const processPayload: (
		payload: RealtimePostgresChangesPayload<{
			[key: string]: any;
		}>
	) => void = (payload) => {
		console.log('New data received:', payload);
		if (payload.table === $skuStore.country.code) {
			const competitor = payload.new as iGenericCompetitor;
			setCompetitorStore(competitor);
		}
	};

	onMount(() => {
		// const channel = supabase
		// 	.channel('realtime messages')
		// 	.on(
		// 		'postgres_changes',
		// 		{
		// 			event: '*',
		// 			schema: 'public'
		// 		},
		// 		processPayload
		// 	)
		// 	.subscribe();

		// return () => {
		// 	supabase.removeChannel(channel);
		// };
	});


	onMount(async () => {
		$competitorStore = {};
		const competitors = await getCompetitors($skuStore.country.code);
		competitors.forEach(setCompetitorStore)
	});
</script>

<div>
	{@render children()}
</div>
<div id="fetched" class="hidden overflow-hidden"></div>
<!-- <iframe id="competition" title="competition"></iframe> -->
