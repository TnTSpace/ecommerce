import type { RequestHandler } from './$types';
import { N8N_WEBHOOK, N8N_PASSWORD, N8N_USER } from '$env/static/private'; 
import type { iPayload } from '$lib/interface';
import { error, json } from '@sveltejs/kit';
import { webhooks } from '$lib/server';

export const POST: RequestHandler = async ({ locals, request }) => {

  console.log("before try-catch")
  try {
    const user = locals.user;
    if (!user) {
      return error(401, { message: 'Unauthenticated' });
    }
    console.log("is Authenticated") 
    const headers = new Headers({
      'Content-Type': 'application/json', 
    });

    const { payload } = await request.json() as { payload: iPayload };
 
    const endpoint = webhooks[payload.country]
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        payload
      })
    });

    console.log("is Authorized", "is okay =", response.ok)

    if (!response.ok) {
      return error(500, { message: `Failed to trigger workflow because: ${response.statusText}` });
    }

    const data = await response.json();
    console.log('n8n workflow triggered successfully:', data);
    return json({ message: 'n8n workflow triggered successfully', data });
  } catch (err: any) {
    return error(400, { message: err.message })
  }

};