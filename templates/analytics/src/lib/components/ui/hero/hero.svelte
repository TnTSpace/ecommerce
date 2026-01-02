<script lang="ts">
	import CenterContent from './center-content.svelte';
	import LeftRightImage, { type iImageSrcAlt, type iTextUrl } from './left-right-image.svelte';

	interface Props {
		type: 'center-content' | '3d-isometric' | 'animated-features' | 'left-right-image';
		title: string;
		subline: string;
		image?: iImageSrcAlt;
		badge?: iTextUrl;
	}
	let { type, title, subline, image, badge }: Props = $props();
</script>

{#if type === 'center-content'}
	<CenterContent {title} {subline} />
{/if}

{#if type === 'left-right-image'}
	<LeftRightImage {title} {subline} image={image as iImageSrcAlt} {badge} />
{/if}
