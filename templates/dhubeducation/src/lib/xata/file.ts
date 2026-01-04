import type { iFile } from "$lib/interface";
import { onError, onSuccess } from "@toolsntuts/utils";
import { getXataClient } from ".";

export const addFile = async (partialFile: Partial<iFile>) => {
  const xata = getXataClient()

  try {
    const file = await xata.db.file.create(partialFile)
    return onSuccess(file)
  } catch (error: any) {
    console.log("addFile()", error.message)
    return onError(error.message)
  }
}

export const getFile = async (fileId: string) => {
  const xata = getXataClient()

  try {
    const file = await xata.db.file.read(fileId)
    return onSuccess(file)
  } catch (error: any) {
    console.log("addFile()", error.message)
    return onError(error.message)
  }
}

export const updateFile = async (fileId: string, data: any) => {
  const xata = getXataClient()
  try {
    const file = await xata.db.file.update(fileId, data)
    return onSuccess(file)
  } catch (error: any) {
    console.log("updateFile()", error.message)
    return onError(error.message)
  }
}

export const deleteXataFile = async (fileId: string) => {
  const xata = getXataClient()

  try {
    const exists = await xata.db.file.filter({ fileId }).getFirst()

    if (exists) {
      const file = await xata.db.file.delete(exists.xata_id)
      return onSuccess(file)
    } else {
      throw new Error("file doesn't exist")
    }
  } catch (error: any) {
    console.log("deleteFile()", error.message)
    return onError(error.message)
  }
}

export const getFiles = async () => {
  const xata = getXataClient()

  try {
    const files = await xata.db.file
      .getMany({ pagination: { size: 200 } })
    return onSuccess(files)
  } catch (error: any) {
    console.log("getFiles()", error.message)
    return onError(error.message)
  }
}