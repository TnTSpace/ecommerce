import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iCampaign } from "$lib/interface"

export const getCampaign = async (id: string) => {
  const xata = getXataClient()
  try {
    const campaign = await xata.db.campaign
      .filter({ xata_id: id })
      .select(["*", "file.*"])
      .getFirst()

    return onSuccess(campaign)
  } catch (error: any) {
    console.log("getCampaign()", error.message)
    return onError(error.message)
  }
}

export const addCampaign = async (partialCampaign: Partial<iCampaign>) => {
  const xata = getXataClient()
  try {
    console.log({ partialCampaign, from: "addCampaign" })
    const campaign = await xata.db.campaign.create(partialCampaign)
    return onSuccess(campaign)
  } catch (error: any) {
    console.log("addCampaign()", error.message)
    return onError(error.message)
  }
}

export const deleteCampaign = async (id: string) => {
  const xata = getXataClient()

  try {
    const campaign = await xata.db.campaign.delete(id)
    return onSuccess(campaign)
  } catch (error: any) {
    console.log("deleteCampaign()", error.message)
    return onError(error.message)
  }
}

export const updateCampaign = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const campaign = await xata.db.campaign.update(id, data)
    return onSuccess(campaign)
  } catch (error: any) {
    console.log("updateCampaign()", error.message)
    return onError(error.message)
  }
}

export const getCampaigns = async () => {
  const xata = getXataClient()

  try {
    const campaigns = await xata.db.campaign
      .select(["*", "file.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(campaigns)
  } catch (error: any) {
    console.log("getCampaigns()", error.message)
    return onError(error.message)
  }
}