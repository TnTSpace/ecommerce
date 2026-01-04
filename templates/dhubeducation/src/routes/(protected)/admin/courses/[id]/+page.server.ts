import type { iCourse } from '$lib/interface';
import { getCourse } from '$lib/xata/course';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const courseResult = await getCourse(id)

  const course = courseResult.data as iCourse
  return { course };
}) satisfies PageServerLoad;