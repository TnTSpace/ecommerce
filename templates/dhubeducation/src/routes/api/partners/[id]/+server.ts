import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iPartner } from '$lib/interface';
import { updatePartner } from '$lib/xata/partner';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialPartner = await request.json()

  const result = updatePartner(id, partialPartner)
  
  return json(result)
};