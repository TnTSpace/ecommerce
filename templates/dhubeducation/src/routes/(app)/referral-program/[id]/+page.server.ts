import type { iRoute } from '$lib/interface';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
import type { iReferral } from '$lib/interface';
import { slugify } from '@toolsntuts/utils';
import { getReferralsByMarkdown } from '$lib/client';
export const load = (async ({ params }) => {
  const { id } = params

  let referral: iReferral | null = null

  let referrals = await getReferralsByMarkdown()

  referral = referrals.find(referral => referral.slug === id) ?? null

  const pages: iRoute[] = referrals
    ? referrals.map(referral => ({ href: `/referral-program/${referral.slug}`, name: referral.type }))
    : []
  const sections = convertHtmlToSections(referral ? referral.content : [])

  const imageSection: iSection = {
    id: 'introduction',
    title: 'Introduction',
    content: `<img src=${referral?.landscapepic} class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(imageSection)
  return {
    pages,
    sections,
    referral
  };
}) satisfies PageServerLoad;