<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import type { Snippet } from 'svelte';
	import { buttonVariants } from '../button';
	import { cn } from '$lib/utils';

	interface Props {
		children: Snippet;
		description: string;
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | undefined;
		size?: 'default' | 'sm' | 'lg' | 'icon' | 'iconsm' | undefined;
		onclick: (evt: any) => void;
    class?: string;
		disable?: boolean;
	}

	let { children, description, variant, size, onclick, class: className, disable }: Props = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger {onclick} class={cn(buttonVariants({ variant, size }), className, disable && "pointer-none opacity-50")}>
			{@render children()}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{description}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
