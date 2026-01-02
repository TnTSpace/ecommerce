<script module lang="ts">
	export type AcceptFileType =
		| 'image/*,video/*'
		| 'image/*'
		| 'video/*'
		| 'audio/*'
		| 'application/*'
		| 'text/*'
		| 'image/png'
		| 'image/jpeg'
		| 'image/jpg'
		| 'image/webp'
		| 'image/gif'
		| 'application/pdf'
		| 'application/msword'
		| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		| 'application/vnd.ms-excel'
		| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		| 'application/json'
		| 'text/plain'
		| 'text/csv'
		| 'video/mp4'
		| 'audio/mpeg';

	export type UploadedFile = {
		name: string;
		type: string;
		size: number;
		uploadedAt: number;
		image: () => Promise<iFile>;
	};

	export function imagesToUploadedFiles(initialImages: iFile[]): UploadedFile[] {
		return initialImages.map((image) => ({
			name: image.url.split('/').pop() ?? 'unknown',
			type: 'image/*', // or extract mime from URL if you have it
			size: 0, // if you know the size, set it — otherwise leave as 0
			uploadedAt: new Date(image.xata_createdat).getTime(),
			image: async () => image
		}));
	}

	export const fileSize = (size: number) => {
		if (size < 1024) return `${size} B`;
		if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
		return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	};

	export const getFileType = (
		filename: string
	): 'video' | 'audio' | 'image' | 'unknown' | 'document' => {
		const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.webm', '.mpeg'];

		const imageExtensions = [
			'.png',
			'.jpg',
			'.jpeg',
			'.webp',
			'.gif',
			'.bmp',
			'.tiff',
			'.svg',
			'.heic'
		];

		const audioExtensions = [
			'.mp3',
			'.m4a',
			'.wav',
			'.aac',
			'.ogg',
			'.flac',
			'.wma',
			'.aiff',
			'.alac'
		];
		const documentExtensions = [
			'.pdf',
			'.doc',
			'.docx',
			'.xls',
			'.xlsx',
			'.ppt',
			'.pptx',
			'.txt',
			'.rtf',
			'.odt',
			'.ods',
			'.odp',
			'.csv',
			'.md'
		];

		const fileExtension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
		if (videoExtensions.includes(fileExtension)) {
			return 'video';
		} else if (imageExtensions.includes(fileExtension)) {
			return 'image';
		} else if (audioExtensions.includes(fileExtension)) {
			return 'audio';
		} else if (documentExtensions.includes(fileExtension)) {
			return 'document';
		} else {
			return 'unknown';
		}
	};
</script>

<script lang="ts">
	import { Button } from '../button';
	import {
		displaySize,
		FileDropZone,
		MEGABYTE,
		type FileDropZoneProps
	} from '$lib/components/ui/file-drop-zone';
	import { Progress } from '../progress';
	import type { iFile } from '../../../interface/index';
	import { cn } from '../../../utils/index';
	import { XIcon } from '@lucide/svelte';
	import Video from './Video.svelte';
	import Audio from './Audio.svelte';
	import Document from './Document.svelte';
	import type { iResult } from '@toolsntuts/utils';
	import { onDestroy, onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import { SvelteDate } from 'svelte/reactivity';
	import { Skeleton } from '../skeleton';
	import SpinLoader from '../spin-loader/spin-loader.svelte';

	interface Props {
		class?: string;
		onUploaded: (files: iFile[]) => void;
		maxFiles?: number;
		maxFileMB: number;
		accept?: AcceptFileType;
		imagekitEndpoint: string;
		initialFiles?: iFile[];
	}

	let {
		class: className,
		maxFiles = 4,
		onUploaded,
		accept = 'image/*',
		imagekitEndpoint,
		maxFileMB = 2,
		initialFiles = []
	}: Props = $props();

	let files = $state<UploadedFile[]>(imagesToUploadedFiles(initialFiles));
	let date = new SvelteDate();
	let images: iFile[] = $state(initialFiles);
	let deletingId = $state('');

	const onUpload: FileDropZoneProps['onUpload'] = async (files) => {
		await Promise.allSettled(files.map((file) => uploadFile(file)));
	};

	const onFileRejected: FileDropZoneProps['onFileRejected'] = async ({ reason, file }) => {
		toast.error(`${file.name} failed to upload!`, { description: reason });
	};

	const uploadFile = async (file: File) => {
		// don't upload duplicate files
		if (files.find((f) => f.name === file.name)) return;

		const promise = async () => {
			const formData = new FormData();
			formData.set('file', file);
			formData.set('fileSize', fileSize(file.size));

			const options: RequestInit = {
				method: 'post',
				body: formData
			};
			const response = await fetch(imagekitEndpoint, options);
			const { status, message, data } = (await response.json()) as iResult;

			if (status === 'error') {
				throw new Error(message);
			}
			const image = data as iFile;

			images = [...images, image];
			onUploaded(images);
			return image;
		};

		files.push({
			name: file.name,
			type: file.type,
			size: file.size,
			uploadedAt: Date.now(),
			image: promise
		});
	};

	onDestroy(async () => {
		for (const file of files) {
			// URL.revokeObjectURL(file.url);
		}
	});

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 10);
		return () => {
			clearInterval(interval);
		};
	});

	const removeFile = async (file: UploadedFile, i: number, image: iFile) => {
		deletingId = image.xata_id;
		const promise = async (fileId: string) => {
			const formData = new FormData();
			formData.set('fileId', fileId);

			const options: RequestInit = {
				method: 'delete',
				body: formData
			};

			const response = await fetch(imagekitEndpoint, options);
			const result = (await response.json()) as iResult;
			return result;
		};
		const { message, status } = await promise(image.fileId);

		if (status === 'error') {
			toast.error(message);
		} else {
			toast.success('Successfully deleted');
			files = [...files.slice(0, i), ...files.slice(i + 1)];
			images = images.filter((img) => img.fileId !== image.fileId);
		}
		deletingId = '';
		onUploaded(images);
	};

	onMount(() => onUploaded(images));
</script>

<div class={cn('flex w-full flex-col gap-2', className)}>
	<FileDropZone
		{onUpload}
		{onFileRejected}
		maxFileSize={maxFileMB * MEGABYTE}
		{accept}
		{maxFiles}
		fileCount={files.length}
	/>
	<div class="flex flex-col gap-2">
		{#each files as file, i (file.name)}
			{#await file.image()}
				<div class="flex place-items-center justify-between gap-2">
					<div class="flex place-items-center gap-2">
						<Skeleton class="relative size-9 overflow-clip" />
						<div class="flex flex-col">
							<span>{file.name}</span>
							<span class="text-xs text-muted-foreground">{displaySize(file.size)}</span>
						</div>
					</div>
					<Progress
						class="h-2 w-full flex-grow"
						value={((date.getTime() - file.uploadedAt) / 1000) * 100}
						max={100}
					/>
				</div>
			{:then image}
				<div class="grid w-full grid-cols-[40px_1fr_40px] gap-2 overflow-hidden">
					<!-- Left: Image Preview -->
					{#if getFileType(file.name) === 'image'}
						<div class="relative size-10 overflow-clip">
							<img
								src={image.url}
								alt={file.name}
								class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							/>
						</div>
					{/if}
					{#if getFileType(file.name) === 'video'}
						<Video class="size-10" />
					{/if}
					{#if getFileType(file.name) === 'audio'}
						<Audio class="size-10" />
					{/if}

					{#if getFileType(file.name) === 'document'}
						<Document class="size-10" />
						<!-- content here -->
					{/if}

					<!-- Middle: File Info -->
					<div class="overflow-hidden">
						<div class="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium">
							{file.name}
						</div>
						{#if file.size === 0}
							<div class="w-fit text-xs text-muted-foreground">
								{image.size}
							</div>
						{:else}
							<div class="w-fit text-xs text-muted-foreground">{displaySize(file.size)}</div>
						{/if}
					</div>

					<!-- Right: Delete Button -->
					<div class="flex items-center justify-end">
						{#if deletingId === image.xata_id}
							<Button variant="outline" size="icon">
								<SpinLoader class="border-primary dark:border-white" />
							</Button>
						{:else}
							<Button variant="outline" size="icon" onclick={() => removeFile(file, i, image)}>
								<XIcon />
							</Button>
						{/if}
					</div>
				</div>
			{:catch error}
				<p>{error}</p>
			{/await}
		{/each}
	</div>
</div>
