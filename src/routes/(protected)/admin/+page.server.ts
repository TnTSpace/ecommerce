import type { PageServerLoad } from './$types';
import { OrderCRUD } from '$lib/db/order';
import { ProductCRUD } from '$lib/db/product';
import { ReviewCRUD } from '$lib/db/review';

export const load = (async () => {
  // Get dashboard stats
  const [orderStats, lowStock, pendingReviews] = await Promise.all([
    OrderCRUD.getStats(),
    ProductCRUD.getLowStock(),
    ReviewCRUD.getPending(1, 5),
  ]);

  return {
    stats: orderStats.data,
    lowStockProducts: lowStock.data || [],
    pendingReviews: pendingReviews.data || [],
  };
}) satisfies PageServerLoad;
