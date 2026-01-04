import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iCourse } from '$lib/interface';
import { updateCourse } from '$lib/xata/course';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialCourse = await request.json()

  const result = updateCourse(id, partialCourse)
  
  return json(result)
};