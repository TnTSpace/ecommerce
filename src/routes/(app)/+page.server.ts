import type { PageServerLoad } from './$types';
import { ProductCRUD } from '$lib/db/product';
import { CategoryCRUD } from '$lib/db/category';

export const load = (async () => {
  // Fetch featured products
  const featuredProducts = await ProductCRUD.getFeatured(8);

  // Fetch new arrivals
  const newArrivals = await ProductCRUD.getFiltered(
    { isActive: true },
    { field: 'createdAt', direction: 'desc' },
    1,
    4
  );

  // Fetch categories
  const categoriesResult = await CategoryCRUD.getAll();
  const categories = categoriesResult.data ? categoriesResult.data.slice(0, 6) : [];

  return {
    featuredProducts: featuredProducts.data || [],
    newArrivals: newArrivals.data || [],
    categories: categories
  };
}) satisfies PageServerLoad;
