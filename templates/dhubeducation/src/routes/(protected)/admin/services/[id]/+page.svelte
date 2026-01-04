<script lang="ts">
	import ServiceForm from '$lib/components/forms/ServiceForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const service = data.service
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<ServiceForm {service} />
		</div>
	</div>
</Admin>