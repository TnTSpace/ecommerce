// src/routes/auth/callback/+server.ts
import { getTokens, getUserInfo } from '$lib/server/googleAuth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addUser, getMe } from '$lib/xata/user';
import type { iUser } from '$lib/interface';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get('code');
  const encodedState = url.searchParams.get('state');
  const storedEncodedState = cookies.get('oauth_state');

  // Decode the state from the URL and from the cookie
  let stateData;
  let storedStateData;
  try {
    stateData = JSON.parse(atob(encodedState as string));
    storedStateData = JSON.parse(atob(storedEncodedState as string));
  } catch (e) {
    // Handle decoding errors or missing data gracefully
    return new Response('Invalid state data', { status: 400 });
  }

  // Validate the CSRF token
  if (!code || !encodedState || stateData.csrfState !== storedStateData.csrfState) {
    return new Response('Invalid state', { status: 400 });
  }

  // Use the redirect URL from the decoded state
  const finalRedirectUrl = stateData.redirectUrl;

  const tokens = await getTokens(code);
  const userInfo = await getUserInfo(tokens.id_token);

  const { email, name, picture, sub: userId } = userInfo;

  // Check if user exists
  // let user = await xata.db.user.filter({ email }).getFirst();
  let user = await getMe(email) as iUser;

  if (!user) {
    // Create user
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ") ?? '';
    user = await addUser({
      email,
      name,
      firstName,
      lastName,
      userId,
      image: picture,
      role: 'guest' // default role
    }) as iUser;
  }

  // Attach roles and user data to session
  cookies.set('session', JSON.stringify({
    id: user.xata_id,
    email: user.email,
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    role: user.role
  }), {
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
  });

  console.log({ finalRedirectUrl })

  // Redirect to the final destination
  throw redirect(302, finalRedirectUrl);
};