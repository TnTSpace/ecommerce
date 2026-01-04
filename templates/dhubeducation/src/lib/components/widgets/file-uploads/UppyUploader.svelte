<script lang="ts">
	import Uppy from '@uppy/core';
	import Dashboard from '@uppy/dashboard';
	import ImageEditor from '@uppy/image-editor';
	// import RemoteSources from '@uppy/remote-sources';
	import XHRUpload from '@uppy/xhr-upload';

	// Don't forget the CSS: core and UI components + plugins you are using
	import '@uppy/core/dist/style.min.css';
	import '@uppy/dashboard/dist/style.min.css';
	import '@uppy/image-editor/dist/style.min.css';

	import { onMount } from 'svelte';

	interface Props {
		oncomplete: (record: any) => void;
		endpoint: string;
		singleFile?: boolean;
		id: string;
		height?: string;
		width?: string;
		name?: string;
	}

	let { oncomplete, endpoint, id, singleFile, height = '380px', width = '100%', name="dashboard" }: Props = $props();

	onMount(() => {
		let uppy = new Uppy()
			.use(Dashboard, {
				inline: true,
				target: `#${name}`,
				width,
				height
			})
			.use(XHRUpload, { endpoint })
			.use(ImageEditor);

		uppy.setMeta({ id });
		uppy.on('complete', oncomplete);

		if (singleFile) {
			uppy.setOptions({
				restrictions: { maxNumberOfFiles: 1 }
			});
		}
		uppy.on('file-removed', (evt) => {
			console.log({ evt });
		});

		return () => uppy.destroy();
	});
</script>

<main id={name}></main>
