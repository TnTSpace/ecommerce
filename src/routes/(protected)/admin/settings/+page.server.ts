import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { SettingsCRUD } from '$lib/db/settings';
import type { Settings } from '$lib/db/schema';

export const load = (async () => {
  const result = await SettingsCRUD.getGlobal();
  return {
    settings: result.data || ({} as Partial<Settings>),
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const data: any = {
      storeName: formData.get('storeName') as string,
      storeEmail: formData.get('storeEmail') as string,
      storePhone: formData.get('storePhone') as string,
      storeAddress: {
        addressLine1: formData.get('storeAddress') as string,
      },
      taxRate: formData.get('taxRate') as string,
      maintenanceMode: formData.get('maintenanceMode') === 'on',
      socialLinks: {
        facebook: formData.get('facebookUrl') as string,
        twitter: formData.get('twitterUrl') as string,
        instagram: formData.get('instagramUrl') as string,
      }
    };

    const result = await SettingsCRUD.updateGlobal(data);

    if (!result.success) {
      return fail(500, { message: result.error });
    }

    return { success: true };
  },
};
