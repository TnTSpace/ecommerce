import { db } from '$lib/db/drizzle';
import { mealLog, healthTracking } from '$lib/db/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { startOfDay, endOfDay } from 'date-fns';
import { fail } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
  const user = locals.user;
  if (!user) return { mealLogs: [], stats: null };

  const today = new Date();
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  const logs = await db.query.mealLog.findMany({
    where: and(
      eq(mealLog.userId, user.id),
      gte(mealLog.createdAt, startOfToday),
      lte(mealLog.createdAt, endOfToday)
    ),
    orderBy: [desc(mealLog.createdAt)]
  });

  const dailyHealth = await db.query.healthTracking.findFirst({
    where: and(
      eq(healthTracking.userId, user.id),
      gte(healthTracking.trackingDate, startOfToday),
      lte(healthTracking.trackingDate, endOfToday)
    )
  });

  // Calculate totals from logs for today
  const totals = logs.reduce((acc, log) => ({
    calories: acc.calories + (log.calories || 0),
    protein: acc.protein + (log.protein || 0),
    carbs: acc.carbs + (log.carbs || 0),
    fats: acc.fats + (log.fats || 0)
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  return {
    mealLogs: logs,
    dailyStats: {
      calories: { current: totals.calories, target: 2000 },
      protein: { current: totals.protein, target: 120 },
      carbs: { current: totals.carbs, target: 200 },
      fats: { current: totals.fats, target: 70 },
      hydration: { current: dailyHealth?.hydration || 0, target: 8 }
    }
  };
}) satisfies PageServerLoad;

export const actions = {
  logMeal: async ({ locals, request }) => {
    const user = locals.user;
    if (!user) return fail(401);

    const data = await request.formData();
    const name = data.get('name') as string;
    const calories = Number(data.get('calories') || 0);
    const protein = Number(data.get('protein') || 0);
    const carbs = Number(data.get('carbs') || 0);
    const fats = Number(data.get('fats') || 0);
    const type = data.get('type') as string;

    const [result] = await db.insert(mealLog).values({
      userId: user.id,
      name,
      calories,
      protein,
      carbs,
      fats,
      type,
      accuracyConfirmed: true
    }).returning();

    // Ensure day is marked in healthTracking
    const today = startOfDay(new Date());
    const existing = await db.query.healthTracking.findFirst({
      where: and(eq(healthTracking.userId, user.id), gte(healthTracking.trackingDate, today))
    });
    if (!existing) {
      await db.insert(healthTracking).values({ userId: user.id, trackingDate: today });
    }

    return { success: true, meal: result };
  },
  logWater: async ({ locals, request }) => {
    const user = locals.user;
    if (!user) return fail(401);
    const data = await request.formData();
    const amount = Number(data.get('amount') || 250);

    // Also update the daily aggregate in healthTracking
    const today = startOfDay(new Date());
    const existing = await db.query.healthTracking.findFirst({
      where: and(eq(healthTracking.userId, user.id), gte(healthTracking.trackingDate, today))
    });

    // We assume 1 unit in healthTracking.hydration is 0.25L (250ml) for simplicity or just track literal L
    // but the UI shows dailyStats.hydration.current in L. 
    // Let's stick to literal L update if possible or just increment by a fixed amount.
    // Dashboard incremented it by 1. 1 unit might be 1 glass. 
    // Let's increment hydration by (amount / 1000) L
    const litters = amount / 1000;

    if (existing) {
      await db
        .update(healthTracking)
        .set({ hydration: Number(existing.hydration || 0) + litters })
        .where(eq(healthTracking.id, existing.id));
    } else {
      await db.insert(healthTracking).values({
        userId: user.id,
        trackingDate: today,
        hydration: litters
      });
    }

    return { success: true };
  }
} satisfies Actions;
