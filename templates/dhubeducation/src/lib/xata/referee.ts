import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { RefereeInterface } from "$lib/interface"

export const getReferee = async (id: string) => {
  const xata = getXataClient()
  try {
    const referee = await xata.db.referee
      .select(["*", "referral.*"])
      .filter({ xata_id: id })
      .getFirst()

    return onSuccess(referee)
  } catch (error: any) {
    console.log("getReferee()", error.message)
    return onError(error.message)
  }
}

export const addReferee = async (partialReferee: Partial<RefereeInterface>) => {
  const xata = getXataClient()
  try {
    const exists = await xata.db.referee
      .filter({
        email: partialReferee.email,
      }).getFirst()

    if (exists) {
      return onError("Already registered")
    } else {
      const referee = await xata.db.referee.create(partialReferee as any)
      return onSuccess(referee)
    }
  } catch (error: any) {
    console.log("addReferee()", error.message)
    return onError(error.message)
  }
}

export const deleteReferee = async (id: string) => {
  const xata = getXataClient()

  try {
    const referee = await xata.db.referee.delete(id)
    return onSuccess(referee)
  } catch (error: any) {
    console.log("deleteReferee()", error.message)
    return onError(error.message)
  }
}

export const updateReferee = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const referee = await xata.db.referee.update(id, data)
    return onSuccess(referee)
  } catch (error: any) {
    console.log("updateReferee()", error.message)
    return onError(error.message)
  }
}

export const getReferees = async () => {
  const xata = getXataClient()

  try {
    const referees = await xata.db.referee
      .select(["*", "referral.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(referees)
  } catch (error: any) {
    console.log("getReferees()", error.message)
    return onError(error.message)
  }
}


export const getRefereesByReferral = async (referralId: string) => {
  const xata = getXataClient()

  try {
    const referees = await xata.db.referee
      .select(["*", "referral.*"])
      .filter({ referral: referralId })
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(referees)
  } catch (error: any) {
    console.log("getReferees()", error.message)
    return onError(error.message)
  }
}