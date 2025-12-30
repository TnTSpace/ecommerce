import type { PageServerLoad } from './$types';
import { ProductCRUD } from '$lib/db/product';

export const load = (async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const search = url.searchParams.get('search') || undefined;

  const result = await ProductCRUD.getFiltered(
    { search },
    { field: 'createdAt', direction: 'desc' },
    page,
    20
  );

  return {
    products: result.data || [],
    meta: result.meta,
  };
}) satisfies PageServerLoad;
