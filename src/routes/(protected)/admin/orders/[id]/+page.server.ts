import type { PageServerLoad, Actions } from './$types';
import { OrderCRUD } from '$lib/db/order';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const { id } = params;

  const result = await OrderCRUD.getByIdWithItems(id);

  if (!result.success || !result.data) {
    throw error(404, 'Order not found');
  }

  return {
    order: result.data,
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  updateStatus: async ({ request, params }) => {
    const { id } = params;
    const formData = await request.formData();
    const status = formData.get('status') as any;

    if (!status) {
      return { success: false, error: 'Status is required' };
    }

    const result = await OrderCRUD.updateStatus(id as string, status);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return { success: true };
  },
};
