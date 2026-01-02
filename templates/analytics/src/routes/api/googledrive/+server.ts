import { uploadFileToGoogleDrive } from '$lib/server/apis/google';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
  
  const { csv } = await request.json() as { csv: string }

  console.log({ csv })
  const result = await uploadFileToGoogleDrive(csv)
  return json(result)
};