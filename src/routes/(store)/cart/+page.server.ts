import type { PageServerLoad } from './$types';
import { CartCRUD } from '$lib/db/cart';
import { auth } from '$lib/auth';

export const load = (async ({ request, cookies }) => {
  const session = await auth.api.getSession({ headers: request.headers });

  let cart = null;

  if (session?.user) {
    const result = await CartCRUD.getOrCreateForUser(session.user.id);
    cart = result.data;
  } else {
    // Check for guest session
    const sessionId = cookies.get('cart_session');
    if (sessionId) {
      const result = await CartCRUD.getOrCreateForSession(sessionId);
      cart = result.data;
    }
  }

  return { cart };
}) satisfies PageServerLoad;
