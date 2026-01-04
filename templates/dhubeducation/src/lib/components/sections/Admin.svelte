<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Role } from '$lib/constants';
	import type { iUser } from '$lib/interface';
	import { getContext, type Snippet } from 'svelte';

	const me = getContext('me') as iUser;

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if me.role === Role.ADMIN}
	{@render children()}
{:else}
	<div class="flex h-screen w-full items-center justify-center">
		<div class="flex flex-col items-center gap-2">
			<span class="text-5xl">🚫</span>
			<h1 class="text-2xl font-semibold">Unauthorized</h1>
			<Button href="/">Homepage 👉</Button>
		</div>
	</div>
{/if}
