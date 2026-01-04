
export const authGuard = (userId: string) => {
  if (!userId) {
    throw new Error("Not authenticated")
  }
}