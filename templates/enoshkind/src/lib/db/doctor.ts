import { db } from "./drizzle";
import { doctor, user } from "./schema";
import { sql, or, like, count, eq, and } from "drizzle-orm";

export async function getDoctors(search: string = '', limit: number = 28, offset: number = 0, specialty?: string, approvedOnly: boolean = true) {
  const searchWhere = search ? or(
    like(doctor.name, `%${search}%`),
    like(doctor.specialty, `%${search}%`)
  ) : undefined;

  const specialtyWhere = specialty ? eq(doctor.specialty, specialty) : undefined;
  const approvedWhere = approvedOnly ? eq(doctor.approved, true) : undefined;

  const conditions = [searchWhere, specialtyWhere, approvedWhere].filter(Boolean);
  const where = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

  const [totalCount] = await db.select({ value: count() }).from(doctor).where(where);
  const data = await db.query.doctor.findMany({
    where,
    orderBy: (doctor, { desc }) => [desc(doctor.rating)],
    limit,
    offset
  });

  return { data, total: totalCount.value };
}

export async function getApprovalsList(search: string = '', limit: number = 28, offset: number = 0) {
  const searchWhere = search ? or(
    like(doctor.name, `%${search}%`),
    like(user.email, `%${search}%`)
  ) : undefined;

  const where = searchWhere ? and(eq(doctor.approved, false), searchWhere) : eq(doctor.approved, false);

  const [totalCount] = await db
    .select({ value: count() })
    .from(doctor)
    .leftJoin(user, eq(doctor.userId, user.id))
    .where(where);

  const data = await db
    .select({
      doctor: doctor,
      user: user
    })
    .from(doctor)
    .leftJoin(user, eq(doctor.userId, user.id))
    .where(where)
    .orderBy(sql`${doctor.createdAt} DESC`)
    .limit(limit)
    .offset(offset);

  return { data, total: totalCount.value };
}

export async function getDoctorById(id: string) {
  return await db.query.doctor.findFirst({
    where: eq(doctor.id, id)
  });
}

export async function addDoctor(data: any) {
  const [result] = await db.insert(doctor).values(data).returning();
  return result;
}
