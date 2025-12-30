import { SizeCRUD } from "$lib/db/size";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const result = await SizeCRUD.getAllWithCounts();

  return {
    sizes: result.data,
  };
};
