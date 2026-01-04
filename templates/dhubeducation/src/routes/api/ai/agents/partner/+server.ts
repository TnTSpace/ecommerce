import { generatePartnerAgent } from '$lib/ai/agents';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { partnercontent } = await request.json()

  console.log({ partnercontent })

  const result = await generatePartnerAgent(partnercontent)

  return json(result)
};