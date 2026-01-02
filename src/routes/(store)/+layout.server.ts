import type { LayoutServerLoad } from './$types';
import { auth } from '$lib/auth';
import { jumiaShipping } from '$lib/server/shipping';

export const load = (async ({ request }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  const shippingZones = await jumiaShipping.getZones();
  return {
    user: session?.user || null,
    shippingZones,
  };
}) satisfies LayoutServerLoad;
