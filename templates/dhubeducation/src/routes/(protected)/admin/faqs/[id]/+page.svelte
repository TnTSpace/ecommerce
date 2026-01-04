<script lang="ts">
	import FaqForm from '$lib/components/forms/FaqForm.svelte';
	import type { PageServerData } from './$types';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();

	const faq = data.faq
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<FaqForm {faq} />
		</div>
	</div>
</Admin>