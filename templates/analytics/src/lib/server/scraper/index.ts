import { PlaywrightCrawler, Dataset, RequestQueue, CheerioCrawler, enqueueLinks } from 'crawlee'
import { getProxies } from './proxyscrape'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { BASE } from '$env/static/private'

const crawl = async (url: string) => {
  const crawler = new CheerioCrawler({
    // Let's limit our crawls to make our
    // tests shorter and safer
    maxRequestsPerCrawl: 20,
    // The `$` argument is the Cheerio object
    // which contains parsed HTML of the website
    async requestHandler({ $, request }) {
      // Extract <title> text with Cheerio
      // See Cheerio documentation for API docs
      const title = $('title').text()
      console.log(`The title of ${request.url} is ${title}`)

      // The enqueueLinks function is context aware,
      // so it does not require any parameters
      // await enqueueLinks({
      //   urls: [],
      //   selector: 'a',
      //   // This will only enqueue links that are relative to the current page
      //   // and have the same domain as the current page
      //   globs: ['https://www.example.com/*']
      // })
    }
  })

  await crawler.run([url])
}
export async function scrapeProduct(productUrl: string) {
  if (!productUrl) return

  try {
    await crawl(productUrl)
    return { message: "successful scraping" }
  } catch (error: any) {
    return { error: error.message }
  }
  // const crawler = new PlaywrightCrawler({
  //   // Use the requestHandler to process each of the crawled pages
  //   async requestHandler({ request, page, enqueueLinks, log }) {
  //     const title = await page.title()
  //     log.info(`Title of ${request.loadedUrl} is ${title}`)

  //     // Save results as JSON to ./storage/datasets/default
  //     await Dataset.pushData({ title, url: request.loadedUrl });

  //     // Extract links from the current page
  //     // and add them to the crawling queue

  //     await enqueueLinks()
  //   },
  // })

  // await crawler.run([productUrl])
  // await crawler.stop()
  return {}
}

// $lib/server/scraper/index.ts
export const fetchByProxy = async (url: string) => {
  try {
    const proxyUrl = `${BASE}/api/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    if (response.ok) {
      return await response.text();
    }
    return '';
  } catch (error) {
    console.error('Proxy fetch error:', error);
    return '';
  }
};
