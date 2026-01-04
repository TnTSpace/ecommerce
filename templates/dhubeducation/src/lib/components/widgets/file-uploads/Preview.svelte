<script lang="ts">
	import {
		audioPreviewableFormats,
		iframePreviewableFormats,
		imagePreviewableFormats
	} from '$lib/constants';
	import { mediaUrlFormat } from '@toolsntuts/utils';

	interface Props {
		url: string;
	}

	let { url }: Props = $props();
	const format = mediaUrlFormat(url);
</script>

{#if imagePreviewableFormats.includes(format.toLowerCase())}
	<img class="size-full object-cover" src={url} alt="preview of uploaded" />
{:else if iframePreviewableFormats.includes(format.toLowerCase())}
	<iframe
		class="aspect-video w-full rounded-md object-cover"
		src={url}
		frameborder="0"
		title="preview of uploaded file"
	></iframe>
{:else if audioPreviewableFormats.includes(format.toLowerCase())}
	<audio controls preload="metadata" class="w-full rounded-lg">
		<source src={url} type="audio/{format}" /> Your browser does not support the audio element.
	</audio>
{/if}
