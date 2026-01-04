import { db } from "./drizzle";
import { educationItem } from "./schema";
import { eq, desc } from "drizzle-orm";

export async function getEducationItems() {
  return await db.query.educationItem.findMany({
    orderBy: desc(educationItem.createdAt)
  });
}

export async function addEducationItem(data: any) {
  const [result] = await db.insert(educationItem).values(data).returning();
  return result;
}

export async function deleteEducationItem(id: string) {
  const [result] = await db.delete(educationItem).where(eq(educationItem.id, id)).returning();
  return result;
}

export async function updateEducationItem(id: string, data: any) {
  const [result] = await db.update(educationItem).set(data).where(eq(educationItem.id, id)).returning();
  return result;
}
