import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { allJumiaEmployees } from '$lib/server';


export const load = (async ({ locals }) => {

  const user = locals.user

  if (!user) {
    throw redirect(302, `/auth/login/`)
  }

  const isAuthorized = allJumiaEmployees(user.email)

  if (!isAuthorized) {
    throw error(401, { message: "Unauthorized to access this page" })
  }
  return { user };
}) satisfies LayoutServerLoad;