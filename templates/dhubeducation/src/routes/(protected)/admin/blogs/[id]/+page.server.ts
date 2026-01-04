import type { iBlog } from '$lib/interface';
import { getBlog } from '$lib/xata/blog';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const blogResult = await getBlog(id)

  const blog = blogResult.data as iBlog
  return { blog };
}) satisfies PageServerLoad;