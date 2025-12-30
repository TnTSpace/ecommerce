import type { PageServerLoad } from './$types';
import { ProductCRUD } from '$lib/db/product';
import { ReviewCRUD } from '$lib/db/review';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const { id } = params;

  const productResult = await ProductCRUD.getById(id);

  if (!productResult.success || !productResult.data) {
    throw error(404, 'Product not found');
  }

  const product = productResult.data;

  // Get review stats and related products
  const [reviewStats, relatedProducts] = await Promise.all([
    ReviewCRUD.getProductStats(product.id),
    product.categoryId
      ? ProductCRUD.getFiltered({ categoryId: product.categoryId, isActive: true }, undefined, 1, 5)
      : Promise.resolve({ data: [] }),
  ]);

  return {
    product,
    reviewStats: reviewStats.data,
    relatedProducts: (relatedProducts.data || []).filter((p: any) => p.id !== product.id),
  };
}) satisfies PageServerLoad;
