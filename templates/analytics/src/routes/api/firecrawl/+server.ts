import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FIRECRAWL_STIB, FIRECRAWL_JUMI, FIRECRAWL_TNTS, FIRECRAWL_BRNK, FIRECRAWL_OGIB, FIRECRAWL_GABI, FIRECRAWL_BRIB, FIRECRAWL_IBIR, FIRECRAWL_BMTN, FIRECRAWL_SAND, FIRECRAWL_SAMS} from '$env/static/private';
import type { iFirecrawlApis } from '$lib/interface';

export const GET: RequestHandler = async ({ locals }) => {

  if (!locals.user) {
    return error(401, 'Unauthorized')
  }
  const firecrawlApis: iFirecrawlApis = {
    ng: FIRECRAWL_JUMI,
    eg: FIRECRAWL_TNTS,
    ci: FIRECRAWL_BRNK,
    ma: FIRECRAWL_STIB,
    ke: FIRECRAWL_OGIB,
    gh: FIRECRAWL_GABI,
    ug: FIRECRAWL_BRIB,
    dz: FIRECRAWL_IBIR,
    sn: FIRECRAWL_BMTN,
    extra: [FIRECRAWL_SAND, FIRECRAWL_SAMS]
  }
  return json(firecrawlApis)
};
