import { XATA_API_KEY, XATA_BRANCH, XATA_DATABASE_URL } from "$env/static/private";
import type { BaseClientOptions } from "@xata.io/client";

export const defaultOptions: BaseClientOptions = {
  databaseURL: XATA_DATABASE_URL,
  apiKey: XATA_API_KEY,
  branch: XATA_BRANCH
}