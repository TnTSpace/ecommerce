import type { PageServerLoad } from './$types';
import { type iSlider } from "$lib/interface";
import { getMetadata } from "$lib/fxns";
import { getReferralsByMarkdown } from "$lib/client";

export const load = (async () => {
  let referrals = await getReferralsByMarkdown()
  let slider: iSlider | null = null;
  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/referral.md', { eager: true });
  slider = getMetadata(sliderspaths)[0] as iSlider;

  return {
    referrals,
    slider
  };
}) satisfies PageServerLoad;