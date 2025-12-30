import { TagCRUD } from "$lib/db/tag";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const result = await TagCRUD.getAllWithCounts();

  return {
    tags: result.data,
  };
};
