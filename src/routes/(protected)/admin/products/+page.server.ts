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

export const actions = {
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    if (!id) {
      return { success: false, error: 'Product ID is required' };
    }

    const result = await ProductCRUD.delete(id);
    if (!result.success) {
      return { success: false, error: result.error || 'Failed to delete product' };
    }

    return { success: true };
  }
};
