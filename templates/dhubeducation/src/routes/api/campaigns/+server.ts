import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iCampaign } from '$lib/interface';
import { addCampaign } from '$lib/xata/campaign';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialCampaign = await request.json() as Partial<iCampaign>

  const result = await addCampaign(partialCampaign)
  return json(result)
};