import { onError, onSuccess } from "@toolsntuts/utils"
import { getXataClient } from "."

export const getMe = async (email: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user
      .filter({
        email
      }).getFirst()

    if (!user) {
      return null
    }
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}

export const getUser = async (userId: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user
      .filter({
        userId
      }).getFirst()

    if (!user) {
      return null
    }
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}

export const addUser = async (data: any) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user.create(data)
    return user
  } catch (error: any) {
    console.log("Internal Error", error.messge)
    return null
  }
}


export const deleteUser = async (id: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user.delete(id)
    return onSuccess(user)
  } catch (error: any) {
    console.log("deleteUser()", error.message)
    return onError(error.message)
  }
}

export const updateUser = async (id: string, data: any) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user.update(id, data)
    return onSuccess(user)
  } catch (error: any) {
    console.log("updateUser()", error.message)
    return onError(error.message)
  }
}

export const getUsers = async () => {
  const xata = getXataClient()

  try {
    const users = await xata.db.user
      .sort("xata_updatedat", "desc")
      .getMany({ pagination: { size: 200 } })

    return onSuccess(users)
  } catch (error: any) {
    console.log("getUsers()", error.message)
    return onError(error.message)
  }
}

const getQuery = (term: string) => {
  const query = {
    name: { $iContains: term },
    email: { $iContains: term },
    role: { $iContains: term },
    firstName: { $iContains: term },
    lastName: { $iContains: term },
  };

  return { $any: {...query} };
}
export const getUsersBySearch = async (searchTerm: string, offset: number) => {
  const xata = getXataClient()

  try {
    const query = getQuery(searchTerm)

    const users = await xata.db.user
    .filter(query as any)
    .sort("xata_updatedat", "desc")
    .getPaginated({
      pagination: {
        size: 12,
        offset
      }
    })
    console.log({ users, from: "getUsersBySearch" })
    return onSuccess(users)
  } catch (error: any) {
    console.log("getUsersBySearch()", error.message)
    return onError(error.message)
  }
}