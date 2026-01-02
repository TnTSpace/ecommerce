import type { iDocument } from '../interface/index';
import { onError, onSuccess } from '@toolsntuts/utils';
import { getXataClient } from './index';

export const addDocument = async (partialDocument: Partial<iDocument>) => {
	const xata = getXataClient();

	try {
		const document = await xata.db.document.create(partialDocument);
		return onSuccess(document);
	} catch (error: any) {
		console.log('addDocument()', error.message);
		return onError(error.message);
	}
};

export const getDocument = async (documentId: string) => {
	const xata = getXataClient();

	try {
		const document = await xata.db.document
			.filter({ xata_id: documentId })
			.select(['*', 'category.*'])
			.getFirst();

		return onSuccess(document);
	} catch (error: any) {
		console.log('addDocument()', error.message);
		return onError(error.message);
	}
};

export const updateDocument = async (id: string, data: any) => {
	const xata = getXataClient();
	try {
		const document = await xata.db.document.update(id, data);
		return onSuccess(document);
	} catch (error: any) {
		console.log('updateDocument()', error.message);
		return onError(error.message);
	}
};

export const deleteDocument = async (documentId: string) => {
	const xata = getXataClient();

	try {
		const exists = await xata.db.document.filter({ xata_id: documentId }).getFirst();

		if (exists) {
			const document = await xata.db.document.delete(exists.xata_id);
			return onSuccess(document);
		} else {
			throw new Error("document doesn't exist");
		}
	} catch (error: any) {
		console.log('deleteDocument()', error.message);
		return onError(error.message);
	}
};

export const getDocuments = async () => {
	const xata = getXataClient();

	try {
		const documents = await xata.db.document
			.select(['*', 'category.*'])
			.getMany({ pagination: { size: 200 } });
		return onSuccess(documents);
	} catch (error: any) {
		console.log('getDocuments()', error.message);
		return onError(error.message);
	}
};
