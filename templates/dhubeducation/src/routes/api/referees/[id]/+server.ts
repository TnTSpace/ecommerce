import type { RefereeInterface } from '$lib/interface';
import { deleteReferee, updateReferee } from '$lib/xata/referee';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { onError } from '@toolsntuts/utils';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }
  
  const partialReferee = await request.json() as Partial<RefereeInterface>

  const result = await updateReferee(partialReferee.xata_id as string, partialReferee)

  return json(result)
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const result = deleteReferee(id)
  return json(result)
};