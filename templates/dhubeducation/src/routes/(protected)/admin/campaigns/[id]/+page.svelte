<script lang="ts">
	import CampaignForm from '$lib/components/forms/CampaignForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const campaign = data.campaign
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<CampaignForm {campaign} />
		</div>
	</div>
</Admin>