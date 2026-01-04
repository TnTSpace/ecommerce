import type { iResult } from "@toolsntuts/utils";

export const throwIfError = (result: iResult) => {
  if (result.status === 'error') {
    throw new Error(result.message);
  }
}