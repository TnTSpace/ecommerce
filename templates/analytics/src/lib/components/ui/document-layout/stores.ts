import type { iDocument, iDocumentCategory, iHTMLSection } from '../../../interface/index';
import { writable } from 'svelte/store';

const docStore = writable<iDocument[]>([]);

const htmlSectionStore = writable<iHTMLSection[]>([]);

const currentHtml = writable<{ section: Element | null; link: Element | null; id: string }>({
	section: null,
	link: null,
	id: ''
});

function createGroupedDocs() {
	const { subscribe, set, update } = writable<Map<string, iDocument[] | undefined>>(new Map());

	function group(docs: iDocument[]) {
		// Object.groupBy is supported in modern environments
		const grouped = Object.groupBy(docs, (doc) => (doc.category as iDocumentCategory).category);
		set(new Map(Object.entries(grouped)));
	}

	return {
		subscribe,
		group,
		update
	};
}

const groupedDocs = createGroupedDocs();

export { docStore, groupedDocs, htmlSectionStore, currentHtml };
