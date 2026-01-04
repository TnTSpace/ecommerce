<script lang="ts">
	import type { iUpload } from '$lib/interface';
	import { toast } from 'svelte-sonner';
	import UppyUploader from './UppyUploader.svelte';
	import type { iResult } from '@toolsntuts/utils';
	import UploadPreview from './UploadPreview.svelte';
	import { getFileType } from '$lib/fxns';

	interface Props {
		upload?: iUpload;
		endpoint: string;
		id: string;
		singleFile?: boolean;
		width?: string;
		height?: string;
		name?: string;
		oncomplete: (upload: iUpload) => void;
		ondelete: (upload: iUpload) => void
	}

	let { upload = $bindable(), endpoint, id, singleFile, width, height, name, ondelete, oncomplete }: Props = $props();

	const handleDelete = async (uploaded: iUpload) => {
		const formData = new FormData();
		formData.set('fileId', uploaded.fileId);
		try {
			const options: RequestInit = {
				method: 'DELETE',
				body: formData
			};
			const response = await fetch(endpoint, options);
			const result = (await response.json()) as iResult;

			if (result.status === 'error') {
				toast.error(result.message);
			}
			upload = undefined
			ondelete(uploaded)
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleComplete = (response: any) => {
		const imgs = response.successful.map((item: any) => ({
			fileId: item.response.body.data.fileId,
			fileType: getFileType(item.response.body.data.url),
			url: item.response.body.data.url
		}));
		upload = imgs[0]
		oncomplete(upload as iUpload)
	};
</script>

<div class="flex flex-col gap-4">
	{#if upload}
		<UploadPreview {upload} ondelete={handleDelete} />
	{:else}
		<UppyUploader {name} {width} {height} {singleFile} {id} oncomplete={handleComplete} {endpoint} />
	{/if}
</div>
