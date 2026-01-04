import type { iCourse, iFile, iRoute } from '$lib/interface';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
import { getCourse, getCourses } from '$lib/xata/course';
export const load = (async ({ params }) => {
  const { id } = params

  const coursesResult = await getCourses()
  const courses = coursesResult.data as iCourse[]

  const courseResult = await getCourse(id)
  const course = courseResult.data as iCourse

  const pages: iRoute[] = courses
    ? courses.map(course => ({ href: `/courses/${course.xata_id}`, name: course.name }))
    : []
  const sections = convertHtmlToSections(course ? course.content : [])

  const fileSection: iSection = {
    id: 'introduction',
    title: 'Introduction',
    content: `<img src="${(course.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset" class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(fileSection)
  return {
    pages,
    sections,
    course
  };
}) satisfies PageServerLoad;