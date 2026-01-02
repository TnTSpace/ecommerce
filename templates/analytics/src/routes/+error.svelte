<script lang="ts">
	import { page } from '$app/state'; 
	import ErrorComponent from '$lib/components/ui/error/error-component.svelte';

	let message = $state(page.error?.message ?? '')
</script> 
 

<ErrorComponent
	code={page.status}
  {message}
	description="But if you don't change your direction, and if you keep looking, you may end up where you are
			heading."
	href={page.url.pathname}
/>
