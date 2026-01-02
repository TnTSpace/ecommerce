import { googleSearch } from '$lib/server/ai-agents/google';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  const { names } = await request.json() as { names: string }

  const result = await googleSearch(names)
  return json(result)
};