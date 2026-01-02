<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { Editor, generateHTML } from '@tiptap/core';
	import { onDestroy, onMount } from 'svelte';
	import './table.css';

	import Image from '@tiptap/extension-image';
	import TextAlign from '@tiptap/extension-text-align';
	import StarterKit from '@tiptap/starter-kit';
	import Table from '@tiptap/extension-table';
	import TableHeader from '@tiptap/extension-table-header';
	import Underline from '@tiptap/extension-underline';
	import TableRow from '@tiptap/extension-table-row';
	import Link from '@tiptap/extension-link';

	import Menu from './Menu.svelte';
	import Display from './Display.svelte';
	import { Iframe } from '../../../utils/tiptap-iframe';
	import { CustomTableCell } from '../../../utils/tiptap-custom-tablecell';

	interface Props {
		title?: string;
		content?: string;
		getcontent: (content: string) => void;
	}

	let { title, getcontent, content }: Props = $props();

	let element: Writable<Element> = writable();
	let editor: Writable<Editor> = writable();

	const extensions = [
		StarterKit,
		Table.configure({
			resizable: true
		}),
		TableRow,
		TableHeader,
		CustomTableCell,
		Link.configure({
			openOnClick: false,
			autolink: true,
			defaultProtocol: 'https',
			protocols: ['http', 'https'],
			isAllowedUri: (url, ctx) => {
				try {
					// construct URL
					const parsedUrl = url.includes(':')
						? new URL(url)
						: new URL(`${ctx.defaultProtocol}://${url}`);

					// use default validation
					if (!ctx.defaultValidate(parsedUrl.href)) {
						return false;
					}

					// disallowed protocols
					const disallowedProtocols = ['ftp', 'file', 'mailto'];
					const protocol = parsedUrl.protocol.replace(':', '');

					if (disallowedProtocols.includes(protocol)) {
						return false;
					}

					// only allow protocols specified in ctx.protocols
					const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

					if (!allowedProtocols.includes(protocol)) {
						return false;
					}

					// disallowed domains
					const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
					const domain = parsedUrl.hostname;

					if (disallowedDomains.includes(domain)) {
						return false;
					}

					// all checks have passed
					return true;
				} catch (error) {
					return false;
				}
			},
			shouldAutoLink: (url) => {
				try {
					// construct URL
					const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

					// only auto-link if the domain is not in the disallowed list
					const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
					const domain = parsedUrl.hostname;

					return !disallowedDomains.includes(domain);
				} catch (error) {
					return false;
				}
			}
		}),
		Image,
		Iframe,
		TextAlign.configure({
			types: ['heading', 'paragraph']
		}),
		Underline
	];

	onMount(() => {
		$editor = new Editor({
			element: $element,
			content: content ? content : '',
			editorProps: {
				attributes: {
					class:
						'mx-auto focus:outline-none py-1 px-2 h-full max-h-[240px] overflow-y-auto !text-base'
				}
			},
			extensions,
			autofocus: true,
			editable: true,
			onTransaction: ({ editor, transaction }) => {
				const content = generateHTML(editor.state.doc.toJSON(), extensions);
				getcontent(content);
			}
		});
	});

	onDestroy(() => {
		if ($editor) {
			$editor.destroy();
		}
	});
</script>

<div class="flex flex-col overflow-hidden rounded-lg border">
	<Menu {editor} {title} />
	<Display {element} />
</div>
