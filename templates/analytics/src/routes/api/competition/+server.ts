import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import type { iCountry, iSKU } from '$lib/interface';
import { CountryCompetitors } from '$lib/constants';
import { brightData, firecrawl, noProxy, scrapeOps, webScrapingApi } from '$lib/server/scraper/scrapers';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  try {
    const { product, country } = await request.json() as { product: iSKU, country: iCountry }

    const competitors = CountryCompetitors[country.code]


    const promises = Object.keys(competitors).map(async (key) => {
      const competitor = competitors[key]
      const url = competitor.getUrl(product)
      // let data: string = await noProxy(url)
      try {

        let data: string = await scrapeOps(url)
        // let data: string = await brightData(url)
        // let data: string = await firecrawl(url)

        return { key, data, sku: product.sku }
      } catch (error: any) {
        console.log(error.message)
        return { key, data: '', sku: product.sku }
      }
    })

    const results = await Promise.all(promises)
    return json(results)
  } catch (err: any) {
    return error(err.message)
  }
};