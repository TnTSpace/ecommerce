import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEducationItems, addEducationItem, updateEducationItem, deleteEducationItem } from '$lib/db/education';

export const GET: RequestHandler = async () => {
  try {
    const items = await getEducationItems();
    return json({ success: true, data: items });
  } catch (e: any) {
    return json({ success: false, message: e.message }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request, locals }) => {
  if (locals.user?.role !== 'admin') {
    return json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const item = await addEducationItem(body);
    return json({ success: true, data: item });
  } catch (e: any) {
    return json({ success: false, message: e.message }, { status: 500 });
  }
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
  if (locals.user?.role !== 'admin') {
    return json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id, ...data } = await request.json();
    const item = await updateEducationItem(id, data);
    return json({ success: true, data: item });
  } catch (e: any) {
    return json({ success: false, message: e.message }, { status: 500 });
  }
};

export const DELETE: RequestHandler = async ({ url, locals }) => {
  if (locals.user?.role !== 'admin') {
    return json({ success: false, message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const id = url.searchParams.get('id');
    if (!id) return json({ success: false, message: 'Missing ID' }, { status: 400 });

    await deleteEducationItem(id);
    return json({ success: true });
  } catch (e: any) {
    return json({ success: false, message: e.message }, { status: 500 });
  }
};
