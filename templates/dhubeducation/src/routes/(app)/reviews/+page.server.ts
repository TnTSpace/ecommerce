import type { PageServerLoad } from './$types';
import { getMetadata } from "$lib/fxns";
import type { iSlider } from "$lib/interface";

export const load = (async () => {
  let slider: iSlider | null = null
  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/reviews.md', { eager: true })
  slider = getMetadata(sliderspaths)[0] as iSlider


  return {
    slider
  };
}) satisfies PageServerLoad;