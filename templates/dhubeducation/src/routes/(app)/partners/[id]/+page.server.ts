import type { iPartner, iFile, iRoute } from '$lib/interface';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
import { getPartner, getPartners } from '$lib/xata/partner';
export const load = (async ({ params }) => {
  const { id } = params

  const partnersResult = await getPartners()
  const partners = partnersResult.data as iPartner[]

  const partnerResult = await getPartner(id)
  const partner = partnerResult.data as iPartner

  const pages: iRoute[] = partners
    ? partners.map(partner => ({ href: `/partners/${partner.xata_id}`, name: partner.name }))
    : []
  const sections = convertHtmlToSections(partner.content)

  const fileSection: iSection = {
    id: 'introduction',
    title: '',
    content: `<img src="${(partner.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset" class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(fileSection)
  return {
    pages,
    sections,
    partner
  };
}) satisfies PageServerLoad;