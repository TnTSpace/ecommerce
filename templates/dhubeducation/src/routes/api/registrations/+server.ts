import type { iRegistration } from '$lib/interface';
import { addRegistration } from '$lib/xata/registration';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  const partialRegistration = await request.json() as Partial<iRegistration>

  const result = await addRegistration(partialRegistration)
  
  return json(result)
};