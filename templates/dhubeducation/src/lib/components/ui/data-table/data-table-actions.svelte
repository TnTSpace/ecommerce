<!--
	Installed from github/TnTSpace/registry
-->

<script lang="ts" module>
	export interface iDataTableActions {
		name: string;
		className?: string;
		icon: any;
		action: (id: string) => void;
	}
</script>

<script lang="ts">
	import { EllipsisIcon } from 'lucide-svelte';
	import { Button } from '../button';
	import * as DropdownMenu from '../dropdown-menu';

	interface Props {
		id: string;
		actions: iDataTableActions[];
	}

	let { id, actions }: Props = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon">
				<span class="sr-only">Open menu</span>
				<EllipsisIcon class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		{#each actions as { action, name, className, icon: Icon }, i}
			<DropdownMenu.Item onclick={() => action(id)} class={className}>
				<Icon class="size-4" />
				<span>{name}</span>
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
