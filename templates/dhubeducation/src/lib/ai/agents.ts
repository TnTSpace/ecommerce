import { GEMINI_API_KEY } from "$env/static/private";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { parse } from 'marked'
import type { iCourse } from "$lib/interface";
import { SocialMediaLinks } from "$lib/constants";

const gemini = createGoogleGenerativeAI({
  apiKey: GEMINI_API_KEY
})


export const generateMarketingCopyAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')

  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Write a persuasive marketing copy for: ${input}. Focus on benefits and prospective job offer after study.`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasCallToAction: z.boolean(),
      jobOffer: z.number().min(1).max(10),
      clarity: z.number().min(1).max(10)
    }),
    prompt: `Evaluate this marketing copy for:
    1. Presence of call to action (true/false)
    2. Prospective job offer after study (1-10)
    3. Clarity (1-10)
    4. Return response in html tag

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.jobOffer < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this marketing copy with:
      ${!qualityMetrics.hasCallToAction ? '- A clear call to action' : ''}
      ${qualityMetrics.jobOffer < 7 ? '- Stronger prospective job offer after study' : ''}
      ${qualityMetrics.clarity < 7 ? '- Improved clarity and directness' : ''}

      Original copy: ${copy}
      `
    })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}

export const generateCourseAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Write a persuasive course content for: ${input}. Focus on clarity and benefits. Make it creative`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasCallToAction: z.boolean(),
      benefit: z.number().min(1).max(10),
      clarity: z.number().min(1).max(10),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      slug: z.string()
    }),
    prompt: `Evaluate this marketing copy for:
    1. Presence of call to action (true/false)
    2. Benefits of the course (1-10)
    3. Clarity (1-10)
    From the copy generate:
    1. Name of the course
    2. Title of the course e.g. BSc. Hons, MSc. etc..
    3. Brief caption or description of the course
    4. URL slug / pathname for the course

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.benefit < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this marketing copy with:
      ${!qualityMetrics.hasCallToAction ? '- A clear call to action' : ''}
      ${qualityMetrics.benefit < 7 ? '- Stronger benefit' : ''}
      ${qualityMetrics.clarity < 7 ? '- Improved clarity and directness' : ''}

      Original copy: ${copy}
      `
    })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}

export const generateServiceAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Write a persuasive course content for: ${input}. Focus on clarity and benefits. Make it creative`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasCallToAction: z.boolean(),
      benefit: z.number().min(1).max(10),
      clarity: z.number().min(1).max(10),
      name: z.string(),
      title: z.string(),
      description: z.string(),
      slug: z.string()
    }),
    prompt: `Evaluate this copy for:
    1. Presence of call to action (true/false)
    2. Benefits of the service (1-10)
    3. Clarity (1-10)
    From the copy generate:
    1. Name of the service
    3. Brief caption or description of the service
    4. URL slug / pathname for the service

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.benefit < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this marketing copy with:
      ${!qualityMetrics.hasCallToAction ? '- A clear call to action' : ''}
      ${qualityMetrics.benefit < 7 ? '- Stronger benefit' : ''}
      ${qualityMetrics.clarity < 7 ? '- Improved clarity and directness' : ''}

      Original copy: ${copy}
      `
    })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}

export const generateBlogAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `
    - Write a one page blog for the following: ${input}.
    - Include a contact us for more information section with an anchor "<a></a>" tag that opens whatsapp "https://api.whatsapp.com/send/?phone=%2B447930739927&text=Hello" when clicked
    - Make it SEO optimized. Include a follow us section with our social media links as anchor element "<a></a>" beneath the blog:
      - Facebook (${SocialMediaLinks.FACEBOOK})
      - Twitter (${SocialMediaLinks.TWITTER})
      - Instagram (${SocialMediaLinks.INSTAGRAM})
      - TikTok (${SocialMediaLinks.TIKTOK})
    - Also include study abroad SEO keywords or hashtags that can index the blog on google search`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasSocialMediaSection: z.boolean(),
      title: z.string(),
      description: z.string(),
      slug: z.string()
    }),
    prompt: `
    Evaluate this copy for:
    1. Presence social media links
    2. Hash Tags or SEO links
    3. Clarity (1-10)

    From the copy generate:
    1. Title of the blog
    3. Brief description of the blog
    4. URL slug / pathname for the blog
    5. Return response in html format

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasSocialMediaSection
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this blog with:
      ${!qualityMetrics.hasSocialMediaSection ? '- A clear call to action' : ''}

      Original copy: ${copy}
      `
    })

    console.log({ qualityMetrics, qm: JSON.stringify(qualityMetrics) })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}

export const generateCampaignAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `
    - Write a one page content for the following: ${input}.
    - Include a contact us for more information section with an anchor "<a></a>" tag that opens whatsapp "https://api.whatsapp.com/send/?phone=%2B447930739927&text=Hello" when clicked
    - Make it SEO optimized. Include a follow us section with our social media links as anchor element "<a></a>" beneath the campaign:
      - Facebook (${SocialMediaLinks.FACEBOOK})
      - Twitter (${SocialMediaLinks.TWITTER})
      - Instagram (${SocialMediaLinks.INSTAGRAM})
      - TikTok (${SocialMediaLinks.TIKTOK})
    - Also include study abroad SEO keywords or hashtags that can index the campaign on google search`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasSocialMediaSection: z.boolean(),
      title: z.string(),
      description: z.string(),
      slug: z.string()
    }),
    prompt: `
    Evaluate this copy for:
    1. Presence social media links
    2. Hash Tags or SEO links
    3. Clarity (1-10)

    From the copy generate:
    1. Title of the campaign
    3. Brief description of the campaign
    4. URL slug / pathname for the campaign
    5. Return response in html format

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasSocialMediaSection
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this campaign with:
      ${!qualityMetrics.hasSocialMediaSection ? '- A clear call to action' : ''}

      Original copy: ${copy}
      `
    })

    console.log({ qualityMetrics, qm: JSON.stringify(qualityMetrics) })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}

export const generatePartnerAgent = async (input: string) => {
  const model = gemini('gemini-2.0-flash-exp')
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `
    - Write a one page content for the following: ${input}.
    - Include a contact us for more information section with an anchor "<a></a>" tag that opens whatsapp "https://api.whatsapp.com/send/?phone=%2B447930739927&text=Hello" when clicked
    - Make it SEO optimized. Include a follow us section with our social media links as anchor element "<a></a>" beneath the partner:
      - Facebook (${SocialMediaLinks.FACEBOOK})
      - Twitter (${SocialMediaLinks.TWITTER})
      - Instagram (${SocialMediaLinks.INSTAGRAM})
      - TikTok (${SocialMediaLinks.TIKTOK})
    - Also include study abroad SEO keywords or hashtags that can index the partner on google search`
  })

  // Perform quality check on copy
  const { object: qualityMetrics } = await generateObject({
    model,
    schema: z.object({
      hasSocialMediaSection: z.boolean(),
      name: z.string(),
      country: z.string(),
      website: z.string(),
      description: z.string(),
      slug: z.string()
    }),
    prompt: `
    Evaluate this copy for:
    1. Presence social media links
    2. Hash Tags or SEO links
    3. Clarity (1-10)

    From the copy generate:
    1. Name of the partner
    2. Country of the partner
    3. Website of the partner
    4. Brief description of the partner
    5. Return response in html format

    Copy to evaluate: ${copy}
    `
  })

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasSocialMediaSection
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this partner with:
      ${!qualityMetrics.hasSocialMediaSection ? '- A clear call to action' : ''}

      Original copy: ${copy}
      `
    })

    console.log({ qualityMetrics, qm: JSON.stringify(qualityMetrics) })

    return { copy: improvedCopy, qualityMetrics }
  }

  return { copy: parse(copy), qualityMetrics }
}