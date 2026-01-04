// hooks.server.ts
import { clerkClient, withClerkHandler } from 'svelte-clerk/server';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';

export const clerk = withClerkHandler();

const redirects: Record<string, string> = {
  '/blog': '/blogs',
  '/blog/uk-tb-booking-test': '/blogs/rec_cvh9pqank4bai19gqb10',
  '/blog/how-your-child-can-study-in-canada-for-free': '/blogs/rec_cvh9s4slh0d7lg7lnoug',
  '/blog/mistakes-to-avoid-as-an-international-student-in-the-uk': '/blogs',
  '/blog/deciding-to-study-abroad': '/blogs',
  '/blog/how-to-apply-to-study-at-a-uk-university': '/blogs',
  '/about-us': '/about',
  '/services/accommodation': '/services/rec_cunhtkub0nn10gatp910',
  '/services/dhub-career': '/services/rec_cuni488k3do61l4hs7s0',
  '/services/immigration--recruitment': '/services/rec_cuni5683uflhaq5qpbe0',
  '/courses/accounting-&-financial-management': '/courses/rec_cuuqvvub0nn10gaubk80',
  '/services/guardianship': '/services/rec_cuni38mb0nn10gatp98g',
  '/courses/business-and-management-progression-route-(level-6)': '/courses/rec_cuur0j6b0nn10gaubk8g',
  '/services/tuition-payment': '/services/rec_cunhaoeb0nn10gatp880',
  '/services/referral-program': '/services/rec_cuni1k83uflhaq5qpbb0',
  '/partners/adelaide-institute-of-business-&-technology': '/partners/rec_cviifeb4j58ck0rectl0',
  '/partners/swinburne-university-of-technology': '/partners/rec_cviigp4lh0d7lg2eichg',
  '/partners/tafe-queensland': '/partners/rec_cviinsslh0d7lg2eicig',
  '/partners/the-university-of-law': '/partners/rec_cviio94lh0d7lg2eicjg',
  '/partners/university-of-suffolk': '/partners/rec_cviiorank4bai1bqk8c0',
  '/partners/university-of-tasmania': '/partners/rec_cviipfink4bai1bqk8cg',
  '/partners/uxbridge-college': '/partners/rec_cviipuclh0d7lg2eickg',
  '/login': '/sign-in',
  '/register': '/sign-up',
  '/contact-us': '/contact',
  '/campaigns/rec_cvglbt4lh0d7lg62mnag': '/campaigns/rec_d0cu56v321eoip97bmug',
  '/campaigns/rec_cvr7r14ejr3f39cfqc90': '/campaigns/rec_d0cu56v321eoip97bmug',
  '/campaigns/rec_d0ctut24rg3c847ilvp0': '/campaigns/rec_d0cu56v321eoip97bmug',
  '/affiliate': '/referral',
  '/affiliate-program': '/referral-program'
};

export const handleRedirect: Handle = async ({ event, resolve }) => {
  const redirectPath = redirects[event.url.pathname];

  if (redirectPath) {
      return new Response(null, {
          status: 302,
          headers: { location: redirectPath }
      });
  }

  return await resolve(event);
};
export const getUser: Handle = async ({ event, resolve }) => {
  const { locals } = event
  const { userId } = locals.auth

  if (userId) {
    const userTxt = await clerkClient.users.getUser(userId as string)
    const user = JSON.parse(JSON.stringify(userTxt))
    event.locals.user = user
  }

  return resolve(event)
}

export const handle: Handle = sequence(clerk, getUser, handleRedirect)