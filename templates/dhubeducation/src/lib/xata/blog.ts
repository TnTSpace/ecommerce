import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."
import type { iBlog } from "$lib/interface"

export const getBlog = async (id: string) => {
  const xata = getXataClient()
  try {
    const blog = await xata.db.blog
      .filter({ xata_id: id })
      .select(["*", "file.*"])
      .getFirst()

    return onSuccess(blog)
  } catch (error: any) {
    console.log("getBlog()", error.message)
    return onError(error.message)
  }
}

export const addBlog = async (partialBlog: Partial<iBlog>) => {
  const xata = getXataClient()
  try {
    console.log({ partialBlog, from: "addBlog" })
    const blog = await xata.db.blog.create(partialBlog)
    return onSuccess(blog)
  } catch (error: any) {
    console.log("addBlog()", error.message)
    return onError(error.message)
  }
}

export const deleteBlog = async (id: string) => {
  const xata = getXataClient()

  try {
    const blog = await xata.db.blog.delete(id)
    return onSuccess(blog)
  } catch (error: any) {
    console.log("deleteBlog()", error.message)
    return onError(error.message)
  }
}

export const updateBlog = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const blog = await xata.db.blog.update(id, data)
    return onSuccess(blog)
  } catch (error: any) {
    console.log("updateBlog()", error.message)
    return onError(error.message)
  }
}

export const getBlogs = async () => {
  const xata = getXataClient()

  try {
    const blogs = await xata.db.blog
      .select(["*", "file.*"])
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(blogs)
  } catch (error: any) {
    console.log("getBlogs()", error.message)
    return onError(error.message)
  }
}