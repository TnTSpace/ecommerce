<script lang="ts">
	import AllFilters from '$lib/components/widgets/AllFilters.svelte';
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';

	let { children } = $props();
	
</script>

<Wrap class="bg-jumia-light-bg dark:bg-background">
	<div class="grid grid-cols-1 xl:grid-cols-[280px_1fr] md:center md:!px-0 gap-4">
		<AllFilters class="hidden xl:flex bg-white dark:bg-secondary shadow-jumia rounded-lg p-2 px-4" />
		<main>
			{@render children()}
		</main>
	</div>
</Wrap>
<div id="fetched" class="hidden overflow-hidden"></div>
