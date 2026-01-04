import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iService } from '$lib/interface';
import { updateService } from '$lib/xata/service';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialService = await request.json()

  const result = updateService(id, partialService)
  
  return json(result)
};