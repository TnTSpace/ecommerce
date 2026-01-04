import type { iBlog, iFile, iRoute } from '$lib/interface';
import type { PageServerLoad } from './$types';
import { convertHtmlToSections } from '$lib/fxns';
import type { iSection } from '$lib/interface';
import { getBlog, getBlogs } from '$lib/xata/blog';
export const load = (async ({ params }) => {
  const { id } = params

  const blogsResult = await getBlogs()
  const blogs = blogsResult.data as iBlog[]

  const blogResult = await getBlog(id)
  const blog = blogResult.data as iBlog

  const pages: iRoute[] = blogs
    ? blogs.map(blog => ({ href: `/blogs/${blog.xata_id}`, name: blog.title }))
    : []
  const sections = convertHtmlToSections(blog ? blog.content : [])

  const fileSection: iSection = {
    id: 'introduction',
    title: '',
    content: `<img src="${(blog.file as iFile)?.url}?w=480;1024;1920&format=webp&as=srcset" class="aspect-video w-full rounded-lg" />`
  }
  sections.unshift(fileSection)
  return {
    pages,
    sections,
    blog
  };
}) satisfies PageServerLoad;