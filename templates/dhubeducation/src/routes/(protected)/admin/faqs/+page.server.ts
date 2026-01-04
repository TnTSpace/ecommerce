import type { iFaq } from '$lib/interface';
import { getFaqs } from '$lib/xata/faq';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const faqsResult = await getFaqs()
  const faqs = faqsResult.data as iFaq[]
  return { faqs };
}) satisfies PageServerLoad;