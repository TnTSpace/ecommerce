import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteFile, uploadFile } from '$lib/server/imagekit';
import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import type { iFile } from '$lib/interface';
import { addFile, deleteXataFile } from '$lib/xata/file';
import { onError } from '@toolsntuts/utils';
import { throwIfError } from '$lib/server';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  const formData = await request.formData()
  const size = formData.get("fileSize") as string
  const file = formData.get("file") as File
  const result = await uploadFile(file)
  const { status, data } = result

  if (status === 'error') {
    return json(result)
  }

  const uploadResponse = data as UploadResponse
  const { fileId, url } = uploadResponse

  const partialFile: Partial<iFile> = { url, fileId, size }

  const addFileResult = await addFile(partialFile)
  return json(addFileResult)
};

export const DELETE: RequestHandler = async ({ request }) => {

  try {
    const formData = await request.formData()
    const fileId = formData.get("fileId") as string
    const xataFileResult = await deleteXataFile(fileId)
    throwIfError(xataFileResult)
    const fileResult = await deleteFile(fileId)
    throwIfError(fileResult)

    return json(fileResult)
  } catch (error: any) {
    return json(onError(error.message))
  }
};