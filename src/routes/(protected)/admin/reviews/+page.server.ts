import { ReviewCRUD } from "$lib/db/review";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const result = await ReviewCRUD.list({
    page,
    limit,
  });

  return {
    reviews: result.data,
    meta: result.meta,
    search,
  };
};
