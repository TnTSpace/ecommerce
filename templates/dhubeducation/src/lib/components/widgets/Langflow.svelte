<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import type { iResult } from '@toolsntuts/utils';
	import SpinLoader from './SpinLoader.svelte';

	let loading = $state(false);

	let messages = $state<string[]>([]);

	const onsubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries());

		try {
			loading = true;
			const options: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(entries)
			};
			const url = '/api/ai';
			const response = await fetch(url, options);
			const result = (await response.json()) as iResult;

			if (result.status === 'error') {
				toast.error(result.message);
			} else {
				console.log({ result });
				const message = result.data.outputs[0].outputs[0].messages[0].message
        messages.push(message)
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<h2>Langflow chat</h2>

<form {onsubmit} class="mx-auto flex w-full max-w-md flex-col items-center gap-2 md:flex-row">
	<Input name="message" />
	{#if loading}
		<Button class="w-20 rounded-lg">
			<SpinLoader class="!border-white dark:!border-primary" />
		</Button>
	{:else}
		<Button type="submit" class="rounded-lg">Send</Button>
	{/if}
</form>

<div class="flex flex-col gap-4">
  {#each messages as message}
     <div class="flex flex-col gap-1 border-b">
      <p>{message}</p>
      <span class="text-muted-foreground text-xs">{new Date().toLocaleString()}</span>
     </div>
  {/each}
</div>
