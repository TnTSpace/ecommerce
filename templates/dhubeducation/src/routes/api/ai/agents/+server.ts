import { generateMarketingCopyAgent } from '$lib/ai/agents';
import type { RequestHandler } from './$types'; 
import { json } from '@sveltejs/kit'; 

export const POST: RequestHandler = async ({ request }) => {
  const { messages } = await request.json()

  const result = await generateMarketingCopyAgent(messages)
  
  console.log({ result, from: "/api/ai/agents" })
  return json(result)
};