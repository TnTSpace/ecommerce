import type { iUser } from '$lib/interface';
import { getMe } from '$lib/xata/user';
import type { LayoutServerLoad } from './$types'; 
import { getCampaigns } from '$lib/xata/campaign';

export const load = (async ({ locals, setHeaders }) => {

  setHeaders({
    'cache-control': 'no-store'
  });
  const user = locals.user

  let me = null

  if (user) {
    me = await getMe(user.emailAddresses[0].emailAddress) as iUser
  }
  
  return { me, getCampaigns: getCampaigns() };
}) satisfies LayoutServerLoad;