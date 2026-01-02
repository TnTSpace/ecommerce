import { CI_WEBHOOK, DZ_WEBHOOK, EG_WEBHOOK, GH_WEBHOOK, KE_wEBHOOK, MA_WEBHOOK, NG_WEBHOOK, SN_WEBHOOK, UG_WEBHOOK } from '$env/static/private';
import type { TCountryCode } from '$lib/interface';
import type { iResult } from '@toolsntuts/utils';

export const throwIfError = (result: iResult) => {
	if (result.status === 'error') {
		throw new Error(result.message);
	}
};

export const allJumiaEmployees = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const jumiaRegex = /@jumia\.com$/;
  return emailRegex.test(email) && jumiaRegex.test(email);
}

export const webhooks: Record<TCountryCode, string> = {
  ng: NG_WEBHOOK,
  eg: EG_WEBHOOK,
  ke: KE_wEBHOOK,
  ci: CI_WEBHOOK,
  ma: MA_WEBHOOK,
  gh: GH_WEBHOOK,
  ug: UG_WEBHOOK,
  dz: DZ_WEBHOOK,
  sn: SN_WEBHOOK
}