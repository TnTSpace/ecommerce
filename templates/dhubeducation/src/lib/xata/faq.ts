import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iFaq } from "$lib/interface"

export const getFaq = async (id: string) => {
  const xata = getXataClient()
  try {
    const faq = await xata.db.faq
      .filter({ xata_id: id })
      .getFirst()

    return onSuccess(faq)
  } catch (error: any) {
    console.log("getFaq()", error.message)
    return onError(error.message)
  }
}

export const addFaq = async (partialFaq: Partial<iFaq>) => {
  const xata = getXataClient()
  try {
    console.log({ partialFaq, from: "addFaq" })
    const faq = await xata.db.faq.create(partialFaq)
    return onSuccess(faq)
  } catch (error: any) {
    console.log("addFaq()", error.message)
    return onError(error.message)
  }
}

export const deleteFaq = async (id: string) => {
  const xata = getXataClient()

  try {
    const faq = await xata.db.faq.delete(id)
    return onSuccess(faq)
  } catch (error: any) {
    console.log("deleteFaq()", error.message)
    return onError(error.message)
  }
}

export const updateFaq = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const faq = await xata.db.faq.update(id, data)
    return onSuccess(faq)
  } catch (error: any) {
    console.log("updateFaq()", error.message)
    return onError(error.message)
  }
}

export const getFaqs = async () => {
  const xata = getXataClient()

  try {
    const faqs = await xata.db.faq
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(faqs)
  } catch (error: any) {
    console.log("getFaqs()", error.message)
    return onError(error.message)
  }
}