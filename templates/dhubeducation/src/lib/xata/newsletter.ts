import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iNewsletter } from "$lib/interface"

export const getNewsletter = async (id: string) => {
  const xata = getXataClient()
  try {
    const newsletter = await xata.db.newsletter
      .filter({ xata_id: id })
      .getFirst()

    return onSuccess(newsletter)
  } catch (error: any) {
    console.log("getNewsletter()", error.message)
    return onError(error.message)
  }
}

export const addNewsletter = async (email: string) => {
  const xata = getXataClient()
  try {
    const exists = await xata.db.newsletter
      .filter({ email }).getFirst()

    if (exists) {
      return onError("Already signed up")
    } else {
      const newsletter = await xata.db.newsletter.create({ email })
      return onSuccess(newsletter)
    }
  } catch (error: any) {
    console.log("addNewsletter()", error.message)
    return onError(error.message)
  }
}

export const deleteNewsletter = async (id: string) => {
  const xata = getXataClient()

  try {
    const newsletter = await xata.db.newsletter.delete(id)
    return onSuccess(newsletter)
  } catch (error: any) {
    console.log("deleteNewsletter()", error.message)
    return onError(error.message)
  }
}

export const updateNewsletter = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const newsletter = await xata.db.newsletter.update(id, data)
    return onSuccess(newsletter)
  } catch (error: any) {
    console.log("updateNewsletter()", error.message)
    return onError(error.message)
  }
}

export const getNewsletters = async () => {
  const xata = getXataClient()

  try {
    const newsletters = await xata.db.newsletter
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(newsletters)
  } catch (error: any) {
    console.log("getNewsletters()", error.message)
    return onError(error.message)
  }
}