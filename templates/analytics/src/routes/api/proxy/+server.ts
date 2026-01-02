// src/routes/api/proxy/+server.ts
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');
  if (!targetUrl) {
    throw error(400, 'Missing "url" query parameter');
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw error(response.status, `Failed to fetch ${targetUrl}`);
    }

    const text = await response.text();
    return new Response(text, {
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    throw error(500, err.message);
  }
};
