import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { updateReferral } from '$lib/xata/referral';
import type { ReferralInterface } from '$lib/interface';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
  console.log("inside p - server request")
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }
  

  const partialReferral = await request.json() as Partial<ReferralInterface>

  console.log("inside patch server", partialReferral)

  const result = await updateReferral(partialReferral.xata_id as string, partialReferral)

  return json(result)
};