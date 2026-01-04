<script lang="ts">
	import FaqList from '$lib/components/lists/FaqList.svelte';
	import Admin from '$lib/components/sections/Admin.svelte';

	let { data }: { data: PageServerData } = $props();
	const faqs = data.faqs;
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<FaqList {faqs} />
		</div>
	</div>
</Admin>
