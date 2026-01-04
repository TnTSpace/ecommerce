import { addNewsletter } from '$lib/xata/newsletter';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
  
  const formData = await request.formData()

  const email = formData.get("email") as string

  const result = await addNewsletter(email)
  
  return json(result)
};