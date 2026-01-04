import { generateCampaignAgent } from '$lib/ai/agents';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { campaigncontent } = await request.json()

  console.log({ campaigncontent })

  const result = await generateCampaignAgent(campaigncontent)

  return json(result)
};