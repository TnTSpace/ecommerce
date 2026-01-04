import type { iService } from '$lib/interface';
import { getService } from '$lib/xata/service';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const serviceResult = await getService(id)

  const service = serviceResult.data as iService
  return { service };
}) satisfies PageServerLoad;