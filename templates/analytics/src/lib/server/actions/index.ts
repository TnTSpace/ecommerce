import { scrapeProduct } from "../scraper"

export async function scrapeAndStoreProducts(productUrl: string) {
  if (!productUrl) return

  try {
    const scrapedProduct = await scrapeProduct(productUrl)
  } catch (error: any) {
    throw new Error(`Error scraping product: ${error.message}`)
  }
}