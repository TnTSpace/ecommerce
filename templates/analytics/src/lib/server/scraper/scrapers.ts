import { BRIGHTDATA_API, BRIGHTDATA_FORMAT, BRIGHTDATA_URL, BRIGHTDATA_ZONE, FIRECRAWL_API_KEY, FIRECRAWL_URL, SCRAPE_DO_URL, SCRAPEOPS_API, SCRAPEOPS_URL, WEBSCRAPING_API, WEBSCRAPING_URL, WEBSHARE_URL } from "$env/static/private"
import { scrapeWithPuppeteer } from "./puppeteer"

export const noProxy = async (url: string) => {
  const response = await fetch(url)
  const text = await response.text()
  return text
}

export const scrapeDo = async (url: string) => {
  const finalUrl = new URL(SCRAPE_DO_URL)
  finalUrl.searchParams.set("token", SCRAPEOPS_API)
  finalUrl.searchParams.set("url", url)
  const response = await fetch(finalUrl.href)
  const text = await response.text()
  return text
}

export const webScrapingApi = async (url: string) => {
  const finalUrl = new URL(WEBSCRAPING_URL)
  finalUrl.searchParams.set("api_key", WEBSCRAPING_API)
  finalUrl.searchParams.set("url", url)
  const response = await fetch(finalUrl.href)
  const text = await response.text()
  return text
}

export const scrapeOps = async (url: string) => {
  const finalUrl = new URL(SCRAPEOPS_URL)
  finalUrl.searchParams.set("api_key", SCRAPEOPS_API)
  finalUrl.searchParams.set('render_js', 'true')
  finalUrl.searchParams.set("url", url)
  const response = await fetch(finalUrl.href)
  const text = await response.text()
  console.log(finalUrl.href)
  // const text = await scrapeWithPuppeteer(finalUrl.href)
  return text
}

export const brightData = async (url: string) => {
  const response = await fetch(BRIGHTDATA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${BRIGHTDATA_API}`
    },
    body: JSON.stringify({
      zone: BRIGHTDATA_ZONE,
      url,
      format: BRIGHTDATA_FORMAT
    })
  })

  const text = await response.text()
  return text
}

export const firecrawl = async (url: string) => {
  const response = await fetch(FIRECRAWL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
    },
    body: JSON.stringify({
      url,
      formats: ["rawHtml"],
      onlyMainContent: true
    })
  })

  const { data } = await response.json()
  console.log({ data })
  return data?.rawHtml ?? ''
}
