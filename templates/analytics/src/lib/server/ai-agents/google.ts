import { GEMINI_API_KEY } from '$env/static/private'
import { createGoogleGenerativeAI, google } from '@ai-sdk/google'
import { generateText } from 'ai'

const gemini = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY
})
export const googleSearch = async (names: string) => {
  const { text, sources, providerMetadata } = await generateText({
    model: gemini('gemini-1.5-pro', {
      useSearchGrounding: true
    }),

    prompt: `
      Give me 2 products in this format 
      interface iProduct {
        name: string;
        href: string;
        price: string;
        image: string;
        ecommerceStore:
      }
      of the items in this list ${names}`
  })
  return { text, sources, providerMetadata }
}