<script lang="ts" module>
	export const isOpen = writable<boolean>(false);
</script>

<script lang="ts">
	import { buttonVariants } from '../button';
	import * as Popover from '../popover/index.js';
	import { cn } from '../../../utils/index';
	import { ChevronDownIcon, TextIcon } from 'lucide-svelte';
	import NavRightItems from './nav-right-items.svelte';
	import { writable } from 'svelte/store';

	const onOpenChange = (value: boolean) => {
		console.log({ value, $isOpen });
	};
</script>

<Popover.Root bind:open={$isOpen} {onOpenChange}>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'sticky top-0 z-10 rounded-none border-b bg-background text-sm font-medium backdrop-blur-md md:top-0 md:bg-card lg:hidden'
		)}
	>
		<TextIcon class="size-4" />
		<span>On this page</span>
		<ChevronDownIcon class="ms-auto size-4 text-muted-foreground" />
	</Popover.Trigger>
	<Popover.Content>
		<NavRightItems />
	</Popover.Content>
</Popover.Root>
