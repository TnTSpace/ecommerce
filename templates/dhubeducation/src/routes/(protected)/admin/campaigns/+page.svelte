<script lang="ts">
	import CampaignList from '$lib/components/lists/CampaignList.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const campaigns = data.campaigns;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<CampaignList {campaigns} />
		</div>
	</div>
</Admin>
