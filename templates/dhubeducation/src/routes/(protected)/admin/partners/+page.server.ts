import type { iPartner } from '$lib/interface';
import { getPartners } from '$lib/xata/partner';
import type { PageServerLoad } from './$types';
export const load = (async () => {
  const partnersResult = await getPartners()
  const partners = partnersResult.data as iPartner[]
  return { partners };
}) satisfies PageServerLoad;