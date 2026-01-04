import type { ReferralInterface, RefereeInterface } from '$lib/interface';
import { getReferralByEmail } from '$lib/xata/referral';
import { getRefereesByReferral } from '$lib/xata/referee';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

  const { me } = await parent()

  let referees: RefereeInterface[] = []

  if (!me) {
    return { referral: undefined, referees }
  }

  const referralResult = await getReferralByEmail(me.email as string)
  const referral = referralResult.data as ReferralInterface

  if (!referral) {
    return { referral: undefined, referees }
  } else {
    const refereesResult = await getRefereesByReferral(referral.xata_id)

    referees = refereesResult.data ?? []

    return { referral, referees };
  }
}) satisfies PageServerLoad;