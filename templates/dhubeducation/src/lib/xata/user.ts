import { getXataClient } from "."

export const getMe = async (email: string) => {
  const xata = getXataClient()

  try {
    const user = await xata.db.user.filter({
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