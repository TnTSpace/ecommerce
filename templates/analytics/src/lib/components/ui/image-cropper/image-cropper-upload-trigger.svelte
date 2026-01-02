<!--
	Installed from github/ieedan/shadcn-svelte-extras
-->

<script lang="ts">
	import { type WithChildren } from 'bits-ui';
	import { useImageCropperTrigger } from './image-cropper.svelte.js';
	import { cn } from '../../../utils/index';

	interface Props {
		class?: string;
	}

	let { children, class: className }: WithChildren & Props = $props();

	const triggerState = useImageCropperTrigger();
	const dropzoneClasses =
		'border-border hover:bg-accent/25 flex w-full place-items-center justify-center rounded-lg border-2 border-dashed transition-all hover:cursor-pointer aria-disabled:opacity-50 aria-disabled:hover:cursor-not-allowed aspect-video';
</script>

<label
	for={triggerState.rootState.id}
	class={cn('hover:cursor-pointer', dropzoneClasses, className)}
>
	{@render children?.()}
</label>
