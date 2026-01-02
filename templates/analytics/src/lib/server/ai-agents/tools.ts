import { generateText, tool } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { GEMINI_API_KEY, FIRECRAWL_API_KEY } from '$env/static/private'
import FirecrawlApp from '@mendable/firecrawl-js'
import { z } from 'zod'

const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY })
const gemini = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY })

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  parameters: z.object({
    urlToCrawl: z.string().url().min(1).max(100).describe('The URL to crawl (including http:// or https://)')
  }),
  execute: async ({ urlToCrawl }) => {
    const crawlResponse = await app.crawlUrl(urlToCrawl, {
      limit: 1,
      scrapeOptions: {
        formats: ['html', 'extract', 'json']
      }
    })

    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error}`)
    }
    return crawlResponse.data
  }
})

export const webScrapeTool = async () => {
  const { text } = await generateText({
    model: gemini('gemma-3-27b-it'),
    prompt: 'Search this link https://www.google.com/search for the 20000mAh powerbank sold in Nigeria',
    tools: {
      webSearch
    },
    maxSteps: 2
  });
  console.log(text)
  return text
}