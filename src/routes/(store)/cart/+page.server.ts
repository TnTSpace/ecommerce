import type { PageServerLoad } from './$types';
import { CartCRUD } from '$lib/db/cart';
import { jumiaShipping } from '$lib/server/shipping';

export const load = (async ({ locals }) => {
  const userId = locals.user?.id;
  const sessionId = locals.cartSessionId;

  let cartResult = null;

  if (userId) {
    // If user is logged in, attempt to merge guest cart first
    if (sessionId) {
      await CartCRUD.mergeGuestCart(sessionId, userId);
    }
    cartResult = await CartCRUD.getOrCreateForUser(userId);
  } else if (sessionId) {
    cartResult = await CartCRUD.getOrCreateForSession(sessionId);
  }

  const zones = await jumiaShipping.getZones();

  return {
    cart: cartResult?.data,
    shippingZones: zones
  };
}) satisfies PageServerLoad;
