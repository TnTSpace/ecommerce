import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iService } from '$lib/interface';
import { addService } from '$lib/xata/service';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialService = await request.json() as Partial<iService>

  const result = await addService(partialService)
  return json(result)
};