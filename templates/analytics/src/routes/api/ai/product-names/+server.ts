import type { iSKU } from '$lib/interface';
import { generateWordName } from '$lib/server/ai-agents';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const { products } = await request.json() as { products: iSKU[] }

  const names = products.map(product => {

    return `- ${product.brand} ${product.name}`
  }).join("\n")

  try {

    const results = await generateWordName(names)
    console.log({ results })
    return json(results)
  } catch (error: any) {
    console.log(error)
    return json([])
  }

};