import type { RequestHandler } from './$types';

import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const GET: RequestHandler = async ({ request }) => {
  
  const fpPromise = FingerprintJS.load()
  const fp = await fpPromise
  const result = await fp.get()
  const visitorId = result.visitorId
  
  return new Response(JSON.stringify({ visitorId }), {
    headers: { 'Content-Type': 'application/json' }
  });
};