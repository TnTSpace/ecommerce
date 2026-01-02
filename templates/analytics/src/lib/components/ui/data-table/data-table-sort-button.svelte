<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { ChevronsUpDownIcon } from 'lucide-svelte';
	import { Button } from '../button';

	interface Props extends ComponentProps<typeof Button> {
		title: string;
	}

	let { variant = 'ghost', title, ...restProps }: Props = $props();
</script>

<Button {variant} {...restProps} class="-ml-4 justify-start">
	<span>{title}</span>
	<ChevronsUpDownIcon class="ml-2" />
</Button>
