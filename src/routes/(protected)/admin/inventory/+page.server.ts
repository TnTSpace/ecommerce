import { ProductCRUD } from "$lib/db/product";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const result = await ProductCRUD.getAll({
    page,
    limit,
    // Add search if ProductCRUD.getAll supports it, otherwise I'll need a list method
  });

  return {
    products: result.data,
    meta: result.meta,
    search,
  };
};
