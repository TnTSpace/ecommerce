import type { iCourse } from '$lib/interface';
import { getCourses } from '$lib/xata/course';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const coursesResult = await getCourses()
  const courses = coursesResult.data as iCourse[]
  return { courses };
}) satisfies PageServerLoad;