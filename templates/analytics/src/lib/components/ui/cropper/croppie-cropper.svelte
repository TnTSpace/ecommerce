<script lang="ts">
	import { onMount } from 'svelte';
	import Croppie from 'croppie';
	import 'croppie/croppie.css';
	import { Button } from '../button';
	import type { ImageUpload } from './use-image-upload.svelte';
	import './cropper.css';
	import { CropIcon, TrashIcon } from 'lucide-svelte';
	import { cn } from '../../../utils/index';
	import SpinLoader from '../spin-loader/spin-loader.svelte';

	interface Props {
		imageUpload: ImageUpload;
		class?: string;
		onCancel: () => void;
		onCropped: (file: File) => void;
	}

	let { imageUpload, class: className, onCancel, onCropped }: Props = $props();

	let croppie = $state<Croppie>();
	let el = $state<HTMLDivElement>();
	let loading = $state(false);

	$effect(() => {
		croppie?.bind({
			url: imageUpload.previewUrl as string,
			orientation: 1
		});
	});

	onMount(async () => {
		const htmlElement = el as HTMLElement;
		croppie = new Croppie(htmlElement, {
			showZoomer: true,
			enforceBoundary: true,
			enableOrientation: true,
			customClass: 'aspect-square'
		});
	});

	const onclick = async () => {
		const blob = await croppie?.result({
			type: 'blob',
			size: {
				width: 1024,
				height: 576
			}
		});

		if (blob) {
			const croppedFile = new File([blob], `${imageUpload.file?.name}`, {
				type: imageUpload.file?.type
			});

			loading = true;
			await onCropped(croppedFile);
			loading = false;
		}
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-center gap-2">
		<Button onclick={onCancel} variant="outline" disabled={loading} class="w-fit">
			<TrashIcon class="size-4" />
			<span>Cancel</span>
		</Button>
		<Button {onclick} class="w-fit" disabled={loading}>
			{#if loading}
				<SpinLoader class="size-4" />
			{:else}
				<CropIcon class="size-4" />
			{/if}
			<span>Crop</span>
		</Button>
	</div>
	<div class={className} bind:this={el}></div>
</div>
