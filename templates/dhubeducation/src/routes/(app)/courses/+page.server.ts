import { getCourses } from '$lib/xata/course';
import type { PageServerLoad, Actions } from './$types';
import { getMetadata } from "$lib/fxns";
import type { iSlider } from "$lib/interface";
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { courseRegistrationFormSchema } from '$lib/components/forms/schemas/course';
import { registerCourse } from '$lib/server/actions/course';

export const load = (async () => {
  let slider: iSlider | null = null
  const sliderspaths = import.meta.glob('/src/lib/content/homepagesliders/courses.md', { eager: true })
  slider = getMetadata(sliderspaths)[0] as iSlider


  return {
    getCourses: getCourses(),
    slider,
    form: await superValidate(zod(courseRegistrationFormSchema))
  };
}) satisfies PageServerLoad;

export const actions = {
  registerCourse
} satisfies Actions