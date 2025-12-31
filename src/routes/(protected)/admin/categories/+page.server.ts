import type { PageServerLoad, Actions } from './$types';
import { CategoryCRUD } from '$lib/db/category';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/db/drizzle';
import { category, product } from '$lib/db/schema';
import { sql, eq, asc } from 'drizzle-orm';

export const load = (async () => {
  // Get all categories
  const categories = await db
    .select()
    .from(category)
    .orderBy(asc(category.sortOrder));

  // Get product counts per category
  const productCounts = await db
    .select({
      categoryId: product.categoryId,
      count: sql<number>`count(*)`,
    })
    .from(product)
    .groupBy(product.categoryId);

  const countMap = new Map(productCounts.map(pc => [pc.categoryId, Number(pc.count)]));

  // Merge categories with product counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    productCount: countMap.get(cat.id) || 0,
  }));

  return {
    categories: categoriesWithCounts,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) return fail(400, { message: 'ID is required' });

    const result = await CategoryCRUD.delete(id);
    if (!result.success) return fail(500, { message: result.error });

    return { success: true };
  }
};
