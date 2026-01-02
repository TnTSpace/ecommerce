// src/routes/logout/+server.ts
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
  // Delete the session cookie
  cookies.delete('session', { path: '/' });

  // Redirect to the homepage
  throw redirect(302, '/');
};
