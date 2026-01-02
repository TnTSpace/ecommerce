import type { iImage } from '../interface/index';
import { onError, onSuccess } from '@toolsntuts/utils';
import { getXataClient } from './index';

export const addImage = async (partialImage: Partial<iImage>) => {
	const xata = getXataClient();

	try {
		const image = await xata.db.image.create(partialImage);
		return onSuccess(image);
	} catch (error: any) {
		console.log('addImage()', error.message);
		return onError(error.message);
	}
};

export const getImage = async (imageId: string) => {
	const xata = getXataClient();

	try {
		const image = await xata.db.image.read(imageId);
		return onSuccess(image);
	} catch (error: any) {
		console.log('addImage()', error.message);
		return onError(error.message);
	}
};

export const updateImage = async (imageId: string, data: any) => {
	const xata = getXataClient();
	try {
		const image = await xata.db.image.update(imageId, data);
		return onSuccess(image);
	} catch (error: any) {
		console.log('updateImage()', error.message);
		return onError(error.message);
	}
};

export const deleteImage = async (fileId: string) => {
	const xata = getXataClient();

	try {
		const exists = await xata.db.image.filter({ fileId }).getFirst();

		if (exists) {
			const image = await xata.db.image.delete(exists.xata_id);
			return onSuccess(image);
		} else {
			throw new Error("file doesn't exist");
		}
	} catch (error: any) {
		console.log('deleteImage()', error.message);
		return onError(error.message);
	}
};

export const getImages = async () => {
	const xata = getXataClient();

	try {
		const images = await xata.db.image
			.sort('xata_createdat', 'desc')
			.getMany({ pagination: { size: 200 } });
		return onSuccess(images);
	} catch (error: any) {
		console.log('getImages()', error.message);
		return onError(error.message);
	}
};
