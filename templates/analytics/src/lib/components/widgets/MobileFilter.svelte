<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../ui/button';
	import { FunnelIcon } from 'lucide-svelte';
	import AllFilters from './AllFilters.svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<Drawer.Root>
	<Drawer.Trigger
		class={cn(
			buttonVariants({ variant: 'ghost' }),
			'flex h-auto flex-col items-center gap-1 text-muted-foreground rounded-none border-none px-2',
			className
		)}
	>
		<FunnelIcon class="!size-5" />
		<span class="text-xs">Filter</span>
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Jumia Analytics</Drawer.Title>
			<Drawer.Description>Filter products</Drawer.Description>
		</Drawer.Header>
		<div class="max-h-56 overflow-y-auto py-2 p-4">
			<AllFilters />
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
