import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { verifyTransaction } from '$lib/server/paystack.server';
import { OrderCRUD } from '$lib/db/order';

export const load = (async ({ url }) => {
  const orderId = url.searchParams.get('orderId');
  const reference = url.searchParams.get('reference');

  if (!orderId || !reference) {
    // If no orderId/reference, just show a generic success/error message or redirect
    return { status: 'unknown' };
  }

  // Verify with Paystack
  const verification = await verifyTransaction(reference);

  if (verification.success && verification.data?.status === 'success') {
    // Update order status
    await OrderCRUD.updatePaymentStatus(orderId, 'paid', reference);
    await OrderCRUD.updateStatus(orderId, 'processing');

    const orderResult = await OrderCRUD.getById(orderId);

    return {
      status: 'success',
      order: orderResult.success ? orderResult.data : null
    };
  } else {
    // Payment failed
    await OrderCRUD.updatePaymentStatus(orderId, 'failed', reference);
    return {
      status: 'failed',
      message: verification.error || 'Payment verification failed'
    };
  }
}) satisfies PageServerLoad;
