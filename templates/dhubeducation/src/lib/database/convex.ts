import { ConvexHttpClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";

// Create a singleton instance of the Convex HTTP client
export const getConvexClient = () => {
  return new ConvexHttpClient(PUBLIC_CONVEX_URL!);
};
