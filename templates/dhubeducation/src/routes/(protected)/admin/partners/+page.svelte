<script lang="ts">
	import PartnerList from '$lib/components/lists/PartnerList.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const partners = data.partners;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<PartnerList {partners} />
		</div>
	</div>
</Admin>
