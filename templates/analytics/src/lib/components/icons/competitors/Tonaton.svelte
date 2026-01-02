<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<svg class={cn('size-10', className)} viewBox="0 0 512.00001 511.99999">
	<style type="text/css" id="style2">
		.st0 {
			fill: #ffffff;
		}
	</style>

	<rect
      class="fill-[#2da57c]"
		id="rect882"
		width="512"
		height="512"
		x="0"
		y="0"
		rx="56.075085"
		ry="62.305653"
	/><path
      class="fill-white"
		d="m 214.65802,83.944115 h 70.56575 v 66.072165 h 50.71477 v 53.89987 H 285.22378 V 354.3523 c 0,15.36182 8.80655,19.43574 19.39417,19.43574 h 36.38229 v 54.26466 h -67.53778 c -37.11079,0.25607 -56.16574,-14.87091 -58.80444,-60.18718 V 203.82997 h -43.28288 l -0.37537,-54.0529 h 43.28288 z"
		id="path1011"
	/></svg
>
