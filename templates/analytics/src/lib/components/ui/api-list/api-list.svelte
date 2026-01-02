<script lang="ts">
	import { page } from '$app/state';
	import ApiAlert from './api-alert.svelte';

	interface Props {
		entityName: string;
		entityIdName: string;
	}

	let { entityIdName, entityName }: Props = $props();

	const origin = page.url.origin;

	const baseUrl = `${origin}/api`;
</script>

<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />

<ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />

<ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />

<ApiAlert
	title="PATCH"
	variant="admin"
	description={`${baseUrl}/${entityName}/{${entityIdName}}`}
/>

<ApiAlert
	title="DELETE"
	variant="admin"
	description={`${baseUrl}/${entityName}/{${entityIdName}}`}
/>
