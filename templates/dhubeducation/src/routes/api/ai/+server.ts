import type { RequestHandler } from './$types';
import { LANGFLOW_APPLICATION_TOKEN, LANGFLOW_URL } from '$env/static/private';
import type { iResult } from '@toolsntuts/utils';
import { json } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request, fetch }) => {
  // Get the request body containing the message and Langflow API details
  const data = await request.json();
  const message = data.message;

  // Prepare the request to Langflow API
  const langflowRequest = new Request(LANGFLOW_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LANGFLOW_APPLICATION_TOKEN}`,
    },
    body: JSON.stringify({
      input_value: message,
      output_type: "chat",
      input_type: "chat",
      // Add any other tweaks or configurations you need
    }),
  });

  // Send the request to Langflow API
  const langflowResponse = await fetch(langflowRequest);

  // Check for successful response
  if (!langflowResponse.ok) {

    const result: iResult = {
      status: "error",
      message: `Error calling Langflow API: ${langflowResponse.statusText}`
    }
    return json(result)
  }

  // Parse the Langflow API response (assuming it's JSON)
  const langflowResponseData = await langflowResponse.json();

  console.log(langflowResponseData)

  const result: iResult = {
    status: "success",
    data: JSON.parse(JSON.stringify(langflowResponseData)),
    message: "Successful"
  }
  // Return the Langflow API response to the client
  return json(result)
};