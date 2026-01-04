import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { updateCampaign } from '$lib/xata/campaign';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialCampaign = await request.json()

  console.log({ id, partialCampaign })

  const result = updateCampaign(id, partialCampaign)
  
  return json(result)
};