import type { iSKU } from '$lib/interface';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateMetadata } from '$lib/server/ai-agents';
import { onError, onSuccess } from '@toolsntuts/utils';


export const POST: RequestHandler = async ({ request }) => {
  const { products } = await request.json() as { products: iSKU[] }

  try {

    const detailList = products.map(product => {
      return `- SKU: ${product.sku}. ${product.displayName}. ${product.details}`
    }).join("\n")

    const metadataList = await generateMetadata(detailList)
    // const promise = async (product: iSKU) => {
    //   const details = `${product.displayName}. ${product.details}`
    //   const metadata = await generateMetadata(details)
    //   product.metadata = metadata
    //   return product
    // }

    // const promises = products.map(promise)

    // const results = await Promise.all(promises)

    const result = onSuccess(metadataList)
    return json(result)

  } catch (error: any) {
    const result = onError(error.message)
    return json(result)
  }
};