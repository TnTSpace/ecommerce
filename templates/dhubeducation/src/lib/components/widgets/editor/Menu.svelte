<script lang="ts">
	import MoreMenu from './MoreMenu.svelte';
	import type { Editor } from '@tiptap/core';
	import type { Writable } from 'svelte/store';
	import StrikethroughIcon from 'lucide-svelte/icons/strikethrough';
	import Italic from 'lucide-svelte/icons/italic';
	import Bold from 'lucide-svelte/icons/bold';
	import YoutubeIcon from 'lucide-svelte/icons/youtube';
	import Link2Icon from 'lucide-svelte/icons/link-2';
	import MoreHorizontalIcon from 'lucide-svelte/icons/ellipsis'; 
	import Underline from 'lucide-svelte/icons/underline';
	import {
		onBold,
		onIframe,
		onImage,
		onItalic,
		onLink,
		onStrikeThrough,
		onUnderline
	} from './utils/functions.js';
	import type { iMedia, iSubmenu } from './utils/types.js'; 
	import IframeDialog from './IframeDialog.svelte'; 
	import DropdownMenu from './DropdownMenu.svelte';
	import { alignment } from './utils/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	interface Props {
		editor: Writable<Editor>;
		title?: string;
	}

	let { editor, title = "What's on your mind?" }: Props = $props();

	const onUpload = (media: iMedia) => {
		onImage($editor, media.secure_url);
	};

	const getUrl = (url: string) => {
		onIframe($editor, url);
	};

	const onDelete = () => {};
</script>

<div
	class="flex w-full flex-col items-center justify-between border-b bg-white dark:bg-secondary md:gap-4"
>
	<p class="line-clamp-1 pt-2 md:pl-2 md:pt-0">{title}</p>
	<ScrollArea orientation="horizontal">
		<div class="flex w-fit items-center whitespace-nowrap">
			<Button variant="ghost" size="icon" onclick={() => onBold($editor)}>
				<Bold class="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onclick={() => onItalic($editor)}>
				<Italic class="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onclick={() => onUnderline($editor)}>
				<Underline class="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onclick={() => onStrikeThrough($editor)}>
				<StrikethroughIcon class="size-4" />
			</Button>
			<DropdownMenu submenu={alignment.submenus as iSubmenu} {editor} />
			<Button variant="ghost" size="icon" onclick={() => onLink($editor)}>
				<Link2Icon class="size-4" />
			</Button>
			<!-- <ImageDialog {onUpload} {onDelete} title="Upload Image">
				<ImageIcon class="size-4" />
			</ImageDialog> -->
			<IframeDialog {getUrl}>
				<YoutubeIcon class="size-4" />
			</IframeDialog>
			<MoreMenu {editor}>
				<MoreHorizontalIcon class="size-4" />
			</MoreMenu>
		</div>
	</ScrollArea>
</div>
