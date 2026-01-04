import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iBlog } from '$lib/interface';
import { addBlog } from '$lib/xata/blog';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialBlog = await request.json() as Partial<iBlog>

  const result = await addBlog(partialBlog)
  return json(result)
};