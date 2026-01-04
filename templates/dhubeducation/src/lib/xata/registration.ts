import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iRegistration } from "$lib/interface"

export const getRegistration = async (id: string) => {
  const xata = getXataClient()
  try {
    const registration = await xata.db.registration
      .filter({ xata_id: id })
      .getFirst()

    return onSuccess(registration)
  } catch (error: any) {
    console.log("getRegistration()", error.message)
    return onError(error.message)
  }
}

export const addRegistration = async (partialRegistration: Partial<iRegistration>) => {
  const xata = getXataClient()
  try {
    const exists = await xata.db.registration
    .filter({
      email: partialRegistration.email,
      type: partialRegistration.type
    }).getFirst()

    if (exists) {
      return onError("Already registered")
    } else {
      const registration = await xata.db.registration.create(partialRegistration)
      return onSuccess(registration)
    }
  } catch (error: any) {
    console.log("addRegistration()", error.message)
    return onError(error.message)
  }
}

export const deleteRegistration = async (id: string) => {
  const xata = getXataClient()

  try {
    const registration = await xata.db.registration.delete(id)
    return onSuccess(registration)
  } catch (error: any) {
    console.log("deleteRegistration()", error.message)
    return onError(error.message)
  }
}

export const updateRegistration = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const registration = await xata.db.registration.update(id, data)
    return onSuccess(registration)
  } catch (error: any) {
    console.log("updateRegistration()", error.message)
    return onError(error.message)
  }
}

export const getRegistrations = async () => {
  const xata = getXataClient()

  try {
    const registrations = await xata.db.registration
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(registrations)
  } catch (error: any) {
    console.log("getRegistrations()", error.message)
    return onError(error.message)
  }
}