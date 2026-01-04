import type { iCampaign } from '$lib/interface';
import { getCampaigns } from '$lib/xata/campaign';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const campaignsResult = await getCampaigns()
  const campaigns = campaignsResult.data as iCampaign[]
  return { campaigns };
}) satisfies PageServerLoad;