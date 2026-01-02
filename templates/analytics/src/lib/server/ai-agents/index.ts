import { GEMINI_API_KEY } from "$env/static/private";
import { Finder } from "$lib/hooks/finder.svelte";
import type { iSKU } from "$lib/interface";
import { createGoogleGenerativeAI, google } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";

const gemini = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY
})


export const generateWordName = async (names: string) => {
  const model = gemini('gemini-2.0-flash-exp')

  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Shorten this product names: ${names} to 4 words per name that gives the best description of the product. Remove the unnecessary and ensure the brand / source of the product starts each name. If it's not in English, don't translate to English. Maintain the language but shorten to 4 words`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      wordCount: z.number().min(3).max(4),
      clarity: z.number().min(1).max(10),
    }),
    prompt: `Evaluate each of the product names in the ${names} list for:
    1. Number of words (3-4)
    2. Clarity (1-10)

    Copy to evaluate: ${copy}
    - Don't rephrase or paraphrase, use exact words in the input but not more than 4 and less than 3
    - Each name in ${copy} MUST start with the first word in ${names}
    - For each name, ONLY use words in ${names} and nothing else
    - Each name in ${copy} MUST not exceed 4 words
    - For each name in ${copy}, DO NOT add words that aren't in ${names}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    qualityMetrics.wordCount < 3 ||
    qualityMetrics.wordCount > 4 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this copy with:
      ${!qualityMetrics.wordCount ? '- has minimum of 3 words and maximum of 4 words' : ''}
      ${qualityMetrics.clarity < 7 ? '- Is clear enough to be found in ecommerce search' : ''}

      Original copy: ${copy}
      `
    })

    console.log({ qualityMetrics })
    return { input: names, output: improvedCopy, qualityMetrics }
  }

  console.log({ qualityMetrics })
  return { input: names, output: copy, qualityMetrics }
}

export const generateMetadata = async (details: string) => {
  if (typeof details !== 'string') throw new Error('Invalid input');

  console.log({ details, from: "generateMetadata" })

  const model = gemini('gemini-2.0-flash');

  const { text: copy } = await generateText({
    model,
    prompt: `For each item in this list ${details}, output exactly this JSON shape:
{ "metadata": { /* attributes extracted: color, size, material, display size, power rating, etc. */ } } Include any relevant attributes you can infer for each product. separate each JSON with a => symbol. Also include the sku for each product as a key in the metadata json. Ensure the keys of metadata are in camelCase`
  })

  // // Define schema with explicit `metadata` object and at least one property
  // const schema = z.object({
  //   metadata: z.object({}).catchall(z.string()).describe(
  //     'Metadata attributes: price, color, size, material, etc.'
  //   ),
  // });

  try {
    const { object: qualityMetrics } = await generateObject({
      model,
      schema: z.object({
        hasMetadata: z.boolean()
      }),
      prompt: `Evaluate ${copy} for
      - an object with metadata key`

    });

    if (!qualityMetrics.hasMetadata) {
      const { text: improvedCopy } = await generateText({
        model,
        prompt: `Rewrite this copy. Original copy:`
      })

      console.log({ improvedCopy })
      return improvedCopy
    }

    console.log({ copy })
    return copy

  } catch (e: any) {
    console.error(e.message);
    throw e;
  }
};