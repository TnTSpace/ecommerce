import type { iCampaign, iFile, iRoute } from '$lib/interface';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
import { getCampaign, getCampaigns } from '$lib/xata/campaign';
export const load = (async ({ params }) => {
  const { id } = params

  const campaignsResult = await getCampaigns()
  const campaigns = campaignsResult.data as iCampaign[]

  const campaignResult = await getCampaign(id)
  const campaign = campaignResult.data as iCampaign

  const pages: iRoute[] = campaigns
    ? campaigns.map(campaign => ({ href: `/campaigns/${campaign.xata_id}`, name: campaign.title }))
    : []
  const sections = convertHtmlToSections(campaign ? campaign.content : [])

  const imageSection: iSection = {
    id: 'introduction',
    title: 'Introduction',
    content: `<img src="${(campaign.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset" class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(imageSection)
  return {
    pages,
    sections,
    campaign
  };
}) satisfies PageServerLoad;