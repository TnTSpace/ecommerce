<script lang="ts">
	import { generateSectionsFromHtmlString } from '../../../fxns/index';
	import type { iDocument, iDocumentCategory } from '../../../interface/index';
	import { onMount, tick, type Snippet } from 'svelte';
	import { currentHtml, htmlSectionStore } from './stores';
	import { groupedDocs } from './stores';
	import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-svelte';
	import { Button } from '../button';

	interface Props {
		document: iDocument;
	}

	let { document: doc }: Props = $props();
	let prev = $state<iDocument | null>(null);
	let next = $state<iDocument | null>(null);

	const observation = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				$currentHtml.section = entry.target;
				$currentHtml.id = entry.target.id;
				$currentHtml.link = document.getElementById(`${entry.target.id}-link`) as Element;
			}
		});
	};

	const options: IntersectionObserverInit = { rootMargin: '-50% 0px' };

	interface iOptions {
		docGroups: [string, iDocument[] | undefined][];
		index: number;
	}

	const getDocumentsAtIndex = (
		docGroups: [string, iDocument[] | undefined][],
		index: number
	): iDocument[] => {
		const [, docs] = docGroups[index] || [];
		return (docs ?? []) as iDocument[];
	};

	const obtainPrevFromFirstDocument = ({ docGroups, index }: iOptions): iDocument | null => {
		const lastIndex = index - 1;
		if (lastIndex < 0) return null;

		const docs = getDocumentsAtIndex(docGroups, lastIndex);
		return docs.length ? docs[docs.length - 1] : null;
	};

	const obtainNextFromLastDocument = ({ docGroups, index }: iOptions): iDocument | null => {
		const nextIndex = index + 1;
		if (nextIndex >= docGroups.length) return null;

		const docs = getDocumentsAtIndex(docGroups, nextIndex);
		return docs.length ? docs[0] : null;
	};

	const findDocumentInGroup = () => {
		const docGroups = Array.from($groupedDocs.entries());

		for (let index = 0; index < docGroups.length; index++) {
			const [, docs] = docGroups[index];
			const documents = (docs ?? []) as iDocument[];

			for (let i = 0; i < documents.length; i++) {
				const currentDoc = documents[i];
				if (doc.xata_id !== currentDoc.xata_id) continue;

				const isFirst = i === 0;
				const isLast = i === documents.length - 1;

				prev = isFirst
					? obtainPrevFromFirstDocument({ docGroups, index })
					: (documents[i - 1] ?? null);
				next = isLast
					? obtainNextFromLastDocument({ docGroups, index })
					: (documents[i + 1] ?? null);

				return;
			}
		}
	};

	onMount(() => {
		findDocumentInGroup();
		let observer: IntersectionObserver;

		const run = async () => {
			$htmlSectionStore = generateSectionsFromHtmlString(doc.content);
			await tick(); // Ensure DOM is updated

			observer = new IntersectionObserver(observation, options);

			$htmlSectionStore.forEach((section) => {
				const el = document.getElementById(section.id);
				if (el) observer.observe(el);
			});
		};
		run();

		// Return cleanup function
		return () => {
			if (observer) {
				$htmlSectionStore.forEach((section) => {
					const el = document.getElementById(section.id);
					if (el) observer.unobserve(el);
				});
				observer.disconnect();
			}
		};
	});
</script>

<div class="prose dark:prose-invert">
	<h1>{doc.title}</h1>
	{#each $htmlSectionStore as section, i}
		{@html section.content}
	{/each}
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
		{#if prev}
			<Button
				href={`/${(prev.category as iDocumentCategory).category.toLowerCase()}/${prev.xata_id}`}
				class="h-auto flex-col items-start py-2"
				variant="outline"
			>
				<div class="flex items-center gap-0.5 text-muted-foreground">
					<ChevronLeftIcon />
					<p>Previous</p>
				</div>
				<div>
					<p class="font-medium">{prev.title}</p>
					<span class="text-xs text-muted-foreground"
						>{(prev.category as iDocumentCategory).category}</span
					>
				</div>
			</Button>
		{:else}
			<div></div>
		{/if}
		{#if next}
			<Button
				href={`/${(next.category as iDocumentCategory).category.toLowerCase()}/${next.xata_id}`}
				class="h-auto flex-col items-end py-2"
				variant="outline"
			>
				<div class="flex items-center gap-0.5 text-muted-foreground">
					<p>Next</p>
					<ChevronRightIcon />
				</div>
				<div class="text-right">
					<p class="font-medium">{next.title}</p>
					<span class="text-xs text-muted-foreground"
						>{(next.category as iDocumentCategory).category}</span
					>
				</div>
			</Button>
		{:else}
			<div></div>
		{/if}
	</div>
</div>
