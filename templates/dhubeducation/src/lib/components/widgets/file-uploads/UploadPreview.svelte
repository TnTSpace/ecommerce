<script lang="ts">
	import XIcon from 'lucide-svelte/icons/x';
	import { writable } from 'svelte/store';
	import { useImageUpload } from '$lib/hooks/use-image-upload.svelte';
	import { mediaUrlFormat } from '@toolsntuts/utils';
	import type { iUpload } from '$lib/interface';
	import Preview from './Preview.svelte';
	import SpinLoader from '../SpinLoader.svelte';

	interface Props {
		upload: iUpload; 
		ondelete: (upload: iUpload) => void;
	}

	let { upload, ondelete }: Props = $props();

	let loading = $state(false);

	const uploadHandler = useImageUpload({ initialImage: upload.url });

	let urlStore = writable(uploadHandler.previewUrl as string);

	$effect(() => {
		$urlStore = uploadHandler.previewUrl as string;
	});

	const onRemove = async () => {
		loading = true;
		await ondelete(upload);
		loading = false;
		
		uploadHandler.handleRemove();
	};

	const format = mediaUrlFormat(upload.url);
</script>

<div class="aspect-auto">
	{@render banner()}
</div>

{#snippet banner()}
	<div class="aspect-video w-full max-w-2xl">
		<div
			class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted"
		>
			{#if uploadHandler.previewUrl}
				<Preview url={uploadHandler.previewUrl} />
			{/if}

			<div class="absolute inset-0 flex items-center justify-center gap-2">
				{#if loading}
					<button
						type="button"
						class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
						aria-label="Remove image"
					>
						<SpinLoader />
					</button>
				{:else}
					<button
						type="button"
						class="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
						onclick={onRemove}
						aria-label="Remove image"
					>
						<XIcon size={16} stroke-width={2} aria-hidden="true" />
					</button>
				{/if}
			</div>
		</div>
	</div>
{/snippet}
