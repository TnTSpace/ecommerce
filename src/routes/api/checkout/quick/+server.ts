import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/auth';
import { OrderCRUD } from '$lib/db/order';
import { initializeTransaction, generatePaymentReference } from '$lib/server/paystack.server';
import { ProductCRUD } from '$lib/db/product';

export const POST: RequestHandler = async ({ request, url }) => {
  const session = await auth.api.getSession({ headers: request.headers });
  const { productId, email, fullName, phone, amount } = await request.json();

  if (!productId || !email || !fullName || !phone) {
    return json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  // Get product details
  const productResult = await ProductCRUD.getById(productId);
  if (!productResult.success || !productResult.data) {
    return json({ success: false, error: 'Product not found' }, { status: 404 });
  }
  const product = productResult.data;

  // Create shipping address object
  const shippingAddress = {
    fullName,
    addressLine1: 'Quick Purchase', // Placeholder
    city: 'Quick Purchase',
    state: 'Quick Purchase',
    country: 'NG',
    phone
  };

  // Calculate total (just 1 item for quick purchase)
  const total = parseFloat(product.basePrice);

  // Create order item
  const orderItems = [{
    productId: product.id,
    productName: product.name,
    productSku: product.sku,
    quantity: 1,
    unitPrice: product.basePrice,
    totalPrice: product.basePrice,
  }];

  // Create order
  const orderResult = await OrderCRUD.createWithItems(
    {
      userId: session?.user?.id || null,
      guestEmail: session?.user ? null : email,
      status: 'pending',
      paymentStatus: 'pending',
      subtotal: total.toFixed(2),
      tax: '0.00',
      shippingCost: '0.00',
      total: total.toFixed(2),
      shippingAddress: shippingAddress as any,
      billingAddress: shippingAddress as any,
    },
    orderItems as any
  );

  if (!orderResult.success || !orderResult.data) {
    return json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }

  const order = orderResult.data;

  // Initialize Paystack payment
  const paymentRef = generatePaymentReference();
  const callbackUrl = `${url.origin}/checkout/success?orderId=${order.id}`;

  const paymentResult = await initializeTransaction({
    email,
    amount: Math.round(total * 100),
    reference: paymentRef,
    callback_url: callbackUrl,
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      isQuickPurchase: true,
      customerName: fullName,
      customerPhone: phone
    },
  });

  if (!paymentResult.success || !paymentResult.data) {
    return json({ success: false, error: paymentResult.error || 'Failed to initialize payment' }, { status: 500 });
  }

  // Update order with payment reference
  await OrderCRUD.update(order.id, { paymentReference: paymentRef } as any);

  return json({
    success: true,
    authorization_url: paymentResult.data.authorization_url
  });
};
