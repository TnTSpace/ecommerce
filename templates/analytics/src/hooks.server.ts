// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');
  console.log({ url: event.url.pathname, from: "hooks.server.ts" })
  event.locals.user = session ? JSON.parse(session) : null;
  return resolve(event);
};
