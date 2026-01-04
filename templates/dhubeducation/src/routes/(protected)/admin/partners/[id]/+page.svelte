<script lang="ts">
	import PartnerForm from '$lib/components/forms/PartnerForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const partner = data.partner;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<PartnerForm {partner} />
		</div>
	</div>
</Admin>
