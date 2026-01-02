import { allJumiaEmployees } from '$lib/server';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {

  const user = locals.user

  if (!user) {
    throw redirect(302, `/auth/login/?redirect=${url.pathname}`)
  }

  const isAuthorized = allJumiaEmployees(user.email)

  if (!isAuthorized) {
    throw error(401, { message: "Unauthorized to access this page" })
  }
  return { user };
}) satisfies LayoutServerLoad;