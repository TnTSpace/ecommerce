import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { ReferralInterface } from "$lib/interface"

export const getReferral = async (id: string) => {
  const xata = getXataClient()
  try {
    const referral = await xata.db.referral
      .filter({ xata_id: id })
      .getFirst()

    return onSuccess(referral)
  } catch (error: any) {
    console.log("getReferral()", error.message)
    return onError(error.message)
  }
}

export const getReferralByEmail = async (email: string) => {
  const xata = getXataClient()
  try {
    const referral = await xata.db.referral
      .filter({ email })
      .getFirst()

    return onSuccess(referral)
  } catch (error: any) {
    console.log("getReferral()", error.message)
    return onError(error.message)
  }
}

export const addReferral = async (partialReferral: Partial<ReferralInterface>) => {
  const xata = getXataClient()
  try {
    const exists = await xata.db.referral
    .filter({
      email: partialReferral.email,
    }).getFirst()

    if (exists) {
      return onError("Already registered")
    } else {
      const referral = await xata.db.referral.create(partialReferral as any)
      return onSuccess(referral)
    }
  } catch (error: any) {
    console.log("addReferral()", error.message)
    return onError(error.message)
  }
}

export const deleteReferral = async (id: string) => {
  const xata = getXataClient()

  try {
    const referral = await xata.db.referral.delete(id)
    return onSuccess(referral)
  } catch (error: any) {
    console.log("deleteReferral()", error.message)
    return onError(error.message)
  }
}

export const updateReferral = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const referral = await xata.db.referral.update(id, data)
    return onSuccess(referral)
  } catch (error: any) {
    console.log("updateReferral()", error.message)
    return onError(error.message)
  }
}

export const getReferrals = async () => {
  const xata = getXataClient()

  try {
    const referrals = await xata.db.referral
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(referrals)
  } catch (error: any) {
    console.log("getReferrals()", error.message)
    return onError(error.message)
  }
}