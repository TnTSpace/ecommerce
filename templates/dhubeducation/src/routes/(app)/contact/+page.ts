import { getMetadata } from "$lib/fxns";
import type { iSlider } from "$lib/interface";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  let slider: iSlider | null = null
  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/contact-us.md', { eager: true })
  slider = getMetadata(sliderspaths)[0] as iSlider
  return { slider };
};