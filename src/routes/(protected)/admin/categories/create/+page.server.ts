import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { CategoryCRUD } from '$lib/db/category';
import { slugify } from '$lib/fxns';

export const load = (async () => {
  const result = await CategoryCRUD.getAll();
  return {
    categories: result.data || [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const slug = (formData.get('slug') as string) || slugify(name);
    const description = formData.get('description') as string;
    const parentId = (formData.get('parentId') as string) || null;
    const isActive = formData.get('isActive') === 'on';

    if (!name) {
      return fail(400, { error: 'Name is required' });
    }

    const result = await CategoryCRUD.create({
      name,
      slug,
      description: description || null,
      parentId,
      isActive,
      sortOrder: 0,
    });

    if (!result.success) {
      return fail(500, { error: result.error });
    }

    throw redirect(303, '/admin/categories');
  },
};
