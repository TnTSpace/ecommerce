import type { LayoutServerLoad } from './$types';
import { buildClerkProps } from 'svelte-clerk/server'

export const load = (async ({ locals }) => {
  
  const userId = locals.auth.userId
  const user = locals.user

  return {
    ...buildClerkProps(locals.auth),
    userId,
    user
  };
}) satisfies LayoutServerLoad;