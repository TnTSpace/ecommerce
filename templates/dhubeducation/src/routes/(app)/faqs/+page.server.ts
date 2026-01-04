import { getMetadata } from '$lib/fxns';
import type { iSlider } from '$lib/interface';
import { getFaqs } from '$lib/xata/faq';
import type { PageServerLoad } from './$types';

export const load = (async () => {

  let slider: iSlider | null = null
  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/faqs.md', { eager: true })
  slider = getMetadata(sliderspaths)[0] as iSlider
  return { getFaqs: getFaqs(), slider };
}) satisfies PageServerLoad;