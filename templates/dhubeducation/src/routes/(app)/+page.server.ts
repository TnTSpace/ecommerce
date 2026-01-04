import { getFaqs } from '$lib/xata/faq';
import { getServices } from '$lib/xata/service';
import { getCourses } from '$lib/xata/course';
import type { PageServerLoad } from './$types';
import { getBlogs } from '$lib/xata/blog';
import { getPartners } from '$lib/xata/partner';
import { getCampaigns } from '$lib/xata/campaign';

export const load = (async () => {

  return { getServices: getServices(), getFaqs: getFaqs(), getCourses: getCourses(), getBlogs: getBlogs(), getPartners: getPartners(), getCampaigns: getCampaigns() };
}) satisfies PageServerLoad;