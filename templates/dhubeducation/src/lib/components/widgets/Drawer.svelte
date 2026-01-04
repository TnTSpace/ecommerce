<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '../ui/button';
	import { MenuIcon } from 'lucide-svelte';
	import Navigation from './Navigation.svelte';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<Drawer.Root>
	<Drawer.Trigger
		class={cn(
			buttonVariants({ variant: 'ghost' }),
			'flex h-auto flex-col items-center gap-1 text-muted-foreground',
			className
		)}
	>
		<MenuIcon class="!size-5" />
		<span class="text-xs">Menu</span>
	</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>DHUB Education</Drawer.Title>
			<Drawer.Description>Navigate our space</Drawer.Description>
		</Drawer.Header>
		<div class="max-h-56 overflow-y-auto">
			<Navigation class="grid grid-cols-2 gap-4 px-4" />
		</div>
		<Drawer.Footer>
			<Drawer.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
