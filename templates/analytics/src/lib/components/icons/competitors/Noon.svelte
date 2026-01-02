<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg class={cn('!w-8', className)} viewBox="0 0 295 295" xml:space="preserve">
	<path
		d="m 237.6,32.727101 -24.6,42.2 c 20.8,18.3 34.5,43.299999 34.5,73.199999 0,55.3 -44.8,100.1 -100.1,100.1 -55.3,0 -101.8,-44.8 -101.8,-100.1 0,-7.5 0.6,-13.9 2.2,-20.9 l -46.7,27.3 c 0,74.5 62.3,140.1 146.3,140.1 80.9,0 146.5,-65.6 146.5,-146.5 0,-46.9 -22,-88.599999 -56.3,-115.399999 z"
		class="fill-[#4a4a4a] dark:fill-[#fce819]"
	/><path
		class="fill-[#4a4a4a] dark:fill-[#fce819]"
		d="m 166.6,50.427101 24.8,-42.6 c 0,0 -21.4,-12.3 -62.3,-5.3 l -31.2,54.5 c -0.1,0.1 26.1,-17.2 68.7,-6.6 z"
		id="path4"
	/>
</svg>
