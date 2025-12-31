import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { CategoryCRUD } from '$lib/db/category';

export const load = (async ({ params }) => {
  const result = await CategoryCRUD.getById(params.id);
  const allCategories = await CategoryCRUD.getAll();

  if (!result.success || !result.data) {
    throw redirect(303, '/admin/categories');
  }

  return {
    category: result.data,
    categories: allCategories.data.filter(c => c.id !== params.id) || [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const parentId = (formData.get('parentId') as string) || null;
    const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true';

    if (!name) {
      return fail(400, { error: 'Name is required' });
    }

    const result = await CategoryCRUD.update(params.id, {
      name,
      description: description || null,
      parentId,
      isActive,
    });

    if (!result.success) {
      return fail(500, { error: result.error });
    }

    throw redirect(303, '/admin/categories');
  },
};
