import type { iPartner } from '$lib/interface';
import { getPartner } from '$lib/xata/partner';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const partnerResult = await getPartner(id)

  const partner = partnerResult.data as iPartner
  return { partner };
}) satisfies PageServerLoad;