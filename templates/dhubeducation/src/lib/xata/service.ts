import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iService } from "$lib/interface"

export const getService = async (id: string) => {
  const xata = getXataClient()
  try {
    const service = await xata.db.service
      .filter({ xata_id: id })
      .select(["*", "file.*"])
      .getFirst()

    return onSuccess(service)
  } catch (error: any) {
    console.log("getService()", error.message)
    return onError(error.message)
  }
}

export const addService = async (partialService: Partial<iService>) => {
  const xata = getXataClient()
  try {
    console.log({ partialService, from: "addService" })
    const service = await xata.db.service.create(partialService)
    return onSuccess(service)
  } catch (error: any) {
    console.log("addService()", error.message)
    return onError(error.message)
  }
}

export const deleteService = async (id: string) => {
  const xata = getXataClient()

  try {
    const service = await xata.db.service.delete(id)
    return onSuccess(service)
  } catch (error: any) {
    console.log("deleteService()", error.message)
    return onError(error.message)
  }
}

export const updateService = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const service = await xata.db.service.update(id, data)
    return onSuccess(service)
  } catch (error: any) {
    console.log("updateService()", error.message)
    return onError(error.message)
  }
}

export const getServices = async () => {
  const xata = getXataClient()

  try {
    const services = await xata.db.service
      .select(["*", "file.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(services)
  } catch (error: any) {
    console.log("getServices()", error.message)
    return onError(error.message)
  }
}