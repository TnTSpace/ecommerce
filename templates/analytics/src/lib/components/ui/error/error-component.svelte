<script lang="ts">
	import Binoculars from '../../icons/binoculars.svelte';
	import { cn } from '../../../utils/index';
	import Button from '../button/button.svelte';

	interface Props {
		code: number;
		message: string;
		description: string;
		href: string;
		class?: string;
	}

	let { code, message, description, href, class: className }: Props = $props();
</script>

<div class={cn('flex h-screen w-full items-center justify-center bg-jumia-light-bg dark:bg-background', className)}>
	<div class="flex flex-col items-center justify-center px-6 py-16 text-center">
		<Binoculars class="aspect-square" />
		<p class="text-6xl font-semibold leading-tight">{code}</p>
		<h1 class="pt-3 text-sm font-bold uppercase tracking-wider">{message}</h1>
		<div class="mx-auto my-6 h-px w-16 bg-muted-foreground"></div>
		<blockquote class="mx-auto mb-0 max-w-xs text-sm font-medium text-muted-foreground">
			{description}
		</blockquote>
		<div class="pt-5">
			<Button {href} aria-label="go to home" class="rounded-full">Take me home</Button>
		</div>
	</div>
</div>
