import type { PageServerLoad } from './$types';
import { ProductCRUD } from '$lib/db/product';
import { CategoryCRUD } from '$lib/db/category';

export const load = (async ({ url }) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const search = url.searchParams.get('search') || undefined;
  const categorySlug = url.searchParams.get('category') || undefined;
  const featured = url.searchParams.get('featured') === 'true';
  const sortParam = url.searchParams.get('sort') || 'newest';

  // Map sort param to field/direction
  const sortMapping: Record<string, { field: any; direction: 'asc' | 'desc' }> = {
    newest: { field: 'createdAt', direction: 'desc' },
    oldest: { field: 'createdAt', direction: 'asc' },
    'price-low': { field: 'basePrice', direction: 'asc' },
    'price-high': { field: 'basePrice', direction: 'desc' },
    name: { field: 'name', direction: 'asc' },
  };

  const sort = sortMapping[sortParam] || sortMapping.newest;

  const [productsResult, categoriesResult] = await Promise.all([
    ProductCRUD.getFiltered(
      { search, isActive: true, isFeatured: featured || undefined },
      sort,
      page,
      20
    ),
    CategoryCRUD.getActiveWithCounts(),
  ]);

  return {
    products: productsResult.data || [],
    meta: productsResult.meta,
    categories: categoriesResult.data || [],
    searchQuery: search,
  };
}) satisfies PageServerLoad;
