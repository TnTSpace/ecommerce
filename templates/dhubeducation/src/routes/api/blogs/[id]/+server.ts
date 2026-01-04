import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iBlog } from '$lib/interface';
import { updateBlog } from '$lib/xata/blog';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialBlog = await request.json()

  const result = updateBlog(id, partialBlog)
  
  return json(result)
};
