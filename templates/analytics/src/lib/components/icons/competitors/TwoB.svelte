<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg class={cn('size-10', className)} viewBox="0 0 512 512">
	<path
		d="m 246.62702,140.64713 v 122.7189 H 50.221193 v 22.26056 H 246.62702 v 50.22125 H 1.4878378e-6 V 213.12866 H 196.40578 V 190.8681 H 1.4878378e-6 v -50.22097 z"
		class="fill-[#f37021]"
		id="path2"
		style="stroke-width:5.20228"
	/>
	<path
		d="M 473.44278,140.64713 H 266.99395 V 335.83119 H 488.61679 L 512,310.70158 V 179.24251 Z m -34.71325,50.22097 v 22.26056 H 317.22092 V 190.8681 Z m 24.19372,94.73664 H 317.2589 v -22.23871 h 145.66435 z"
		class="fill-black dark:fill-white"
		id="path4"
		style="stroke-width:5.20228"
	/>
	<path
		d="M 446.53191,371.35288 H 1.4878378e-6 V 348.69851 H 475.32497 Z"
		class="fill-black dark:fill-white"
		id="path6"
		style="stroke-width:5.20228"
	/>
</svg>
