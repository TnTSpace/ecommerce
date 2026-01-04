<script lang="ts">
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg
	class={cn('size-4', className)}
	viewBox="0 0 30 30"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<defs id="defs12" />
	<path
		d="M 2.3333337,14.333333 6.3333335,10.333334 2.3333337,6.3333336"
		id="path4"
		style="stroke-width:2.66667"
	/>
	<rect
		width="9.333333"
		height="17.333332"
		x="14.333333"
		y="10.333333"
		rx="1.3333333"
		id="rect2"
		transform="matrix(0,1,1,0,0,0)"
		style="stroke-width:2.66667"
	/>
</svg>
