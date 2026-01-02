import { allJumiaEmployees } from '$lib/server';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, url }) => {

  const user = locals.user

  return { user };
}) satisfies LayoutServerLoad;