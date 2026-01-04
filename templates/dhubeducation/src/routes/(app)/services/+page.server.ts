import { getMetadata } from '$lib/fxns';
import type { iService, iSlider } from '$lib/interface';
import { getServices } from '$lib/xata/service';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const servicesResult = await getServices()
  const services = servicesResult.data as iService[]

  let slider: iSlider | null = null

  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/our-services.md', { eager: true })

  slider = getMetadata(sliderspaths)[0] as iSlider

  return { services: services || [], slider };
}) satisfies PageServerLoad;