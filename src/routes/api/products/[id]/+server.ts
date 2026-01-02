import type { RequestHandler } from './$types';
import { ProductCRUD } from '$lib/db/product';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const productResult = await ProductCRUD.getById(params.id);

  if (!productResult.success || !productResult.data) {
    return json({ success: false, error: 'Product not found' }, { status: 404 });
  }

  return json({ success: true, data: productResult.data });
};
