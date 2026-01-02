import type { iDocumentCategory } from '../interface/index';
import { onError, onSuccess } from '@toolsntuts/utils';
import { getXataClient } from './index';

export const addDocumentCategory = async (partialDocumentCategory: Partial<iDocumentCategory>) => {
	const xata = getXataClient();

	try {
		const documentcategory = await xata.db.documentcategory.create(partialDocumentCategory);
		return onSuccess(documentcategory);
	} catch (error: any) {
		console.log('addDocumentCategory()', error.message);
		return onError(error.message);
	}
};

export const getDocumentCategory = async (docId: string) => {
	const xata = getXataClient();

	try {
		const documentcategory = await xata.db.documentcategory.read(docId);
		return onSuccess(documentcategory);
	} catch (error: any) {
		console.log('addDocumentCategory()', error.message);
		return onError(error.message);
	}
};

export const updateDocumentCategory = async (id: string, data: any) => {
	const xata = getXataClient();
	try {
		const documentcategory = await xata.db.documentcategory.update(id, data);
		return onSuccess(documentcategory);
	} catch (error: any) {
		console.log('updateDocumentCategory()', error.message);
		return onError(error.message);
	}
};

export const deleteDocumentCategory = async (docId: string) => {
	const xata = getXataClient();

	try {
		const exists = await xata.db.documentcategory.filter({ xata_id: docId }).getFirst();

		if (exists) {
			const documentcategory = await xata.db.documentcategory.delete(exists.xata_id);
			return onSuccess(documentcategory);
		} else {
			throw new Error("documentcategory doesn't exist");
		}
	} catch (error: any) {
		console.log('deleteDocumentCategory()', error.message);
		return onError(error.message);
	}
};

export const getDocumentCategories = async () => {
	const xata = getXataClient();

	try {
		const docs = await xata.db.documentcategory.getMany({ pagination: { size: 200 } });
		return onSuccess(docs);
	} catch (error: any) {
		console.log('getDocumentCategories()', error.message);
		return onError(error.message);
	}
};
