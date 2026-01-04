import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iCourse } from '$lib/interface';
import { addCourse } from '$lib/xata/course';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialCourse = await request.json() as Partial<iCourse>

  const result = await addCourse(partialCourse)
  return json(result)
};