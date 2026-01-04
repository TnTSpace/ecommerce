import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iPartner } from '$lib/interface';
import { addPartner } from '$lib/xata/partner';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialPartner = await request.json() as Partial<iPartner>

  const result = await addPartner(partialPartner)
  return json(result)
};