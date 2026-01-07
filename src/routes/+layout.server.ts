import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { wishlist } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
  let wishlistProductIds: string[] = [];

  if (locals.user?.id) {
    try {
      const results = await db
        .select({ productId: wishlist.productId })
        .from(wishlist)
        .where(eq(wishlist.userId, locals.user.id));

      wishlistProductIds = results.map(r => r.productId);
    } catch (e) {
      console.error('Failed to fetch wishlist IDs:', e);
    }
  }

  return {
    user: locals.user ?? null,
    wishlistProductIds
  };
};
