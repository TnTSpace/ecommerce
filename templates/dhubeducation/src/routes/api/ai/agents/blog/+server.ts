import { generateBlogAgent } from '$lib/ai/agents';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { blogcontent } = await request.json()

  console.log({ blogcontent })

  const result = await generateBlogAgent(blogcontent)

  console.log({ result })

  return json(result)
  // return json({})
};