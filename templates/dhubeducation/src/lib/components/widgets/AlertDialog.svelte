<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import SpinLoader from './SpinLoader.svelte';

	interface Props {
		onconfirm: () => void;
		children: Snippet;
		disabled: boolean;
		name: string;
		class?: string
	}

	let loading = $state(false);

	let { onconfirm, children, disabled, name, class: className }: Props = $props();

	let onclick = async () => {
		loading = true;
		await onconfirm();
		loading = false;
	};
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger {disabled} class={cn(buttonVariants({ variant: 'destructive', size: 'icon' }), className)}>
		{@render children()}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete {name} and remove it's data from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			{#if loading}
				<AlertDialog.Action class="bg-red-500 dark:bg-red-500">
					<SpinLoader class={cn("border-white dark:border-white w-4 h-4")} />
				</AlertDialog.Action>
			{:else}
				<AlertDialog.Action class="!bg-red-500 !text-white" {onclick}>Continue</AlertDialog.Action>
			{/if}
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
