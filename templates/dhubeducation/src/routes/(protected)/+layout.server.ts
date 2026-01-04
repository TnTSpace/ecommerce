import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getMe } from '$lib/xata/user';
import { getServices } from '$lib/xata/service';
import { getBlogs } from '$lib/xata/blog';
import type { iService, iUser, iBlog } from '$lib/interface';
import { Role } from '$lib/constants';

export const load = (async ({ locals, url }) => {

  const userId = locals.auth.userId
  const user = locals.user
  const pathname = url.pathname

  if (!userId) {
    throw redirect(302, `/sign-in?redirect=${pathname}`)
  }

  const me = await getMe(user.emailAddresses[0].emailAddress) as iUser

  const servicesResult = await getServices()
  const services = servicesResult.data as iService[]
  
  const blogsResult = await getBlogs()
  const blogs = blogsResult.data as iBlog[] 
  
  return { me, services, blogs };
}) satisfies LayoutServerLoad;