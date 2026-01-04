import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iFaq } from '$lib/interface';
import { updateFaq } from '$lib/xata/faq';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const { id } = params

  const partialFaq = await request.json()

  const result = updateFaq(id, partialFaq)
  
  return json(result)
};