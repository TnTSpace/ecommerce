import type { iResult } from "@toolsntuts/utils";
import { arrayToCSV } from "..";
import { toast } from "svelte-sonner";
import type { TCountryCode } from "$lib/interface";

function openInNewTab(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
export const exportToGoogleSheets = async (data: Record<string, any>[], code: TCountryCode) => {

  const csv = arrayToCSV(data, code);

  try {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ csv })
    };
    console.log({ csv })
    const url = '/api/googledrive';
    const response = await fetch(url, options);
    const result = (await response.json()) as iResult;
    console.log({ result })

    if (result.status === 'error') {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      openInNewTab(result.data.url);
    }
  } catch (error: any) {
    toast.error(error.message);
    console.log(error)
  }
};
