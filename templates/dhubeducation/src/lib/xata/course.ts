import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iCourse } from "$lib/interface"

export const getCourse = async (id: string) => {
  const xata = getXataClient()
  try {
    const course = await xata.db.course
      .filter({ xata_id: id })
      .select(["*", "file.*"])
      .getFirst()

    return onSuccess(course)
  } catch (error: any) {
    console.log("getCourse()", error.message)
    return onError(error.message)
  }
}

export const addCourse = async (partialCourse: Partial<iCourse>) => {
  const xata = getXataClient()
  try {
    console.log({ partialCourse, from: "addCourse" })
    const course = await xata.db.course.create(partialCourse)
    return onSuccess(course)
  } catch (error: any) {
    console.log("addCourse()", error.message)
    return onError(error.message)
  }
}

export const deleteCourse = async (id: string) => {
  const xata = getXataClient()

  try {
    const course = await xata.db.course.delete(id)
    return onSuccess(course)
  } catch (error: any) {
    console.log("deleteCourse()", error.message)
    return onError(error.message)
  }
}

export const updateCourse = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const course = await xata.db.course.update(id, data)
    return onSuccess(course)
  } catch (error: any) {
    console.log("updateCourse()", error.message)
    return onError(error.message)
  }
}

export const getCourses = async () => {
  const xata = getXataClient()

  try {
    const courses = await xata.db.course
      .select(["*", "file.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(courses)
  } catch (error: any) {
    console.log("getCourses()", error.message)
    return onError(error.message)
  }
}