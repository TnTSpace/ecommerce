import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { ReferralInterface } from '$lib/interface';
import { addReferral } from '$lib/xata/referral';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialReferral = await request.json() as Partial<ReferralInterface>
  const result = await addReferral(partialReferral)
  return json(result)
};