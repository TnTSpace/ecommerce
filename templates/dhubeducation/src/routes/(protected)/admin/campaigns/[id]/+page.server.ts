import type { iCampaign } from '$lib/interface';
import { getCampaign } from '$lib/xata/campaign';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const campaignResult = await getCampaign(id)

  const campaign = campaignResult.data as iCampaign
  return { campaign };
}) satisfies PageServerLoad;