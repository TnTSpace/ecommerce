<script lang="ts">
	import ServiceList from '$lib/components/lists/ServiceList.svelte';
	import Admin from '$lib/components/sections/Admin.svelte';
</script>

<Admin>
	<div class="flex-col">
		<div class="flex-1 space-y-4 p-4 pt-2">
			<ServiceList />
		</div>
	</div>
</Admin>
