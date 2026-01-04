import { onError } from '@toolsntuts/utils';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import type { iFaq } from '$lib/interface';
import { addFaq } from '$lib/xata/faq';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const user = locals.user

  if (!user) {
    return json(onError("Unauthenticated"))
  }

  const partialFaq = await request.json() as Partial<iFaq>

  const result = await addFaq(partialFaq)
  return json(result)
};