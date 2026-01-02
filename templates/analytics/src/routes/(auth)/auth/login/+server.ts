// src/routes/auth/login/+server.ts
import { getAuthURL } from '$lib/server/googleAuth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const redirectUrl = url.searchParams.get('redirect') || '/';
  const csrfState = crypto.randomUUID();

  // Create a single state object containing the CSRF token and the redirect URL
  const stateData = {
    csrfState,
    redirectUrl,
  };

  // Stringify and encode the state object for URL safety
  const encodedState = btoa(JSON.stringify(stateData));

  cookies.set('oauth_state', encodedState, {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  });

  const authURL = getAuthURL(encodedState);
  throw redirect(302, authURL);
};