import type { PageServerLoad } from './$types';
import { CategoryCRUD } from '$lib/db/category';

export const load = (async () => {
  const result = await CategoryCRUD.getActiveWithCounts();
  return {
    categories: result.data || [],
  };
}) satisfies PageServerLoad;
