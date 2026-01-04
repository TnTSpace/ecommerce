import type { iFaq } from '$lib/interface';
import { getFaq } from '$lib/xata/faq';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const faqResult = await getFaq(id)

  const faq = faqResult.data as iFaq
  return { faq };
}) satisfies PageServerLoad;