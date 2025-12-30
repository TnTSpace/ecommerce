import { FileCRUD } from "$lib/db/file";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "24");

  const result = await FileCRUD.getAll({
    page,
    limit,
  });

  const stats = await FileCRUD.getStorageStats();

  return {
    files: result.data,
    meta: result.meta,
    stats: stats.data,
  };
};
