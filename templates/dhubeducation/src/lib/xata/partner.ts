import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iPartner } from "$lib/interface"

export const getPartner = async (id: string) => {
  const xata = getXataClient()
  try {
    const partner = await xata.db.partner
      .filter({ xata_id: id })
      .select(["*", "file.*"])
      .getFirst()

    return onSuccess(partner)
  } catch (error: any) {
    console.log("getPartner()", error.message)
    return onError(error.message)
  }
}

export const addPartner = async (partialPartner: Partial<iPartner>) => {
  const xata = getXataClient()
  try {
    console.log({ partialPartner, from: "addPartner" })
    const partner = await xata.db.partner.create(partialPartner)
    return onSuccess(partner)
  } catch (error: any) {
    console.log("addPartner()", error.message)
    return onError(error.message)
  }
}

export const deletePartner = async (id: string) => {
  const xata = getXataClient()

  try {
    const partner = await xata.db.partner.delete(id)
    return onSuccess(partner)
  } catch (error: any) {
    console.log("deletePartner()", error.message)
    return onError(error.message)
  }
}

export const updatePartner = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const partner = await xata.db.partner.update(id, data)
    return onSuccess(partner)
  } catch (error: any) {
    console.log("updatePartner()", error.message)
    return onError(error.message)
  }
}

export const getPartners = async () => {
  const xata = getXataClient()

  try {
    const partners = await xata.db.partner
      .select(["*", "file.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(partners)
  } catch (error: any) {
    console.log("getPartners()", error.message)
    return onError(error.message)
  }
}