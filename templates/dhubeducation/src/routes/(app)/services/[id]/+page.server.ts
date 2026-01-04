import type { iImage, iRoute, iService } from '$lib/interface';
import { getService, getServices } from '$lib/xata/service';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
export const load = (async ({ params }) => {
  const { id } = params

  const servicesResult = await getServices()
  const services = servicesResult.data as iService[]

  const serviceResult = await getService(id)
  const service = serviceResult.data as iService

  const pages: iRoute[] = services
    ? services.map(service => ({ href: `/services/${service.xata_id}`, name: service.name }))
    : []
  const sections = convertHtmlToSections(service ? service.content : [])

  const imageSection: iSection = {
    id: 'introduction',
    title: 'Introduction',
    content: `<img src="${(service.file as iImage)?.url}?w=480;1024;1920&format=webp&as=srcset" class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(imageSection)
  return {
    pages,
    sections,
    service
  };
}) satisfies PageServerLoad;