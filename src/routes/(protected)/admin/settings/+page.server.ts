import type { PageServerLoad, Actions } from './$types';
import { SettingsCRUD } from '$lib/db/settings';

export const load = (async () => {
  const result = await SettingsCRUD.getGlobal();
  return {
    settings: result.data || {},
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const data = {
      storeName: formData.get('storeName') as string,
      storeEmail: formData.get('storeEmail') as string,
      storePhone: formData.get('storePhone') as string,
      storeAddress: formData.get('storeAddress') as string,
      taxRate: formData.get('taxRate') as string,
      maintenanceMode: formData.get('maintenanceMode') === 'on',
      facebookUrl: formData.get('facebookUrl') as string,
      twitterUrl: formData.get('twitterUrl') as string,
      instagramUrl: formData.get('instagramUrl') as string,
    };

    const result = await SettingsCRUD.updateGlobal(data);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return { success: true };
  },
};
