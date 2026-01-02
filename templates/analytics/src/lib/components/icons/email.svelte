<script lang="ts">
	import { cn } from '../../utils/index';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={cn('size-5 shrink-0', className)}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
	stroke-width="2"
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
	/>
</svg>
