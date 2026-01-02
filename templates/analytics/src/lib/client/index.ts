// import { resource } from "runed";
// import { string } from "zod/v4";

import { CountryCompetitors } from "$lib/constants";
import type { ModalType, TCountryCode } from "$lib/interface";
import { modalStore } from "$lib/stores";
import { onCopy } from "@toolsntuts/utils";
import { toast } from "svelte-sonner";

// const CLIENT_ID = '200870237638-8f2m0ooi8r8l4ck0san4gepr2ulkd0ef.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyCMSWUFpGnaDQKBTsxHId52MgrJFRXnC64';
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
// const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// const updateSigninStatus = (isSignedIn: boolean): void => {
//   if (isSignedIn) {
//     console.log('User signed in')
//     // You can now make authorized API calls
//   } else {
//     console.log('User not signed in')
//     // Prompt the user to sign in
//     gapi.auth2.getAuthInstance().signIn()
//   }
// }

// export const initializeGapiClient = (): void => {
//   gapi.load('client:auth2', () => {
//     gapi.client
//       .init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES
//       }).then(() => {
//         // Listen for sign-in state changes.
//         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

//         // Handle the initial sign-in state
//         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
//       }).catch((error: any) => console.error('Error initializing gapi client:', error))
//   })
// }

// export const uploadCSVToDrive = async (csvContent: string, fileName: string): Promise<string> => {
//   const fileMetadata = {
//     name: fileName,
//     mimeType: 'application/vnd.google-apps.spreadsheet'
//   }

//   const media = {
//     mimeType: 'text/csv',
//     body:csvContent
//   }

//   // Use Google Drive API to upload the file
//   // This requires proper authentication setup
//   const response = await gapi.client.drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id'
//   })

//   return response.result.id
// }

// const openGoogleSheet = (fileId: string): void => {
//   const url = `https://docs.google.com/spreadsheets/d/${fileId}/edit`;
//   window.open(url, '_blank')
// }

export const arrayToCSV = (data: Record<string, any>[], code: TCountryCode): string => {
  if (!data.length) return ''

  const competitorStrList = Object.keys(CountryCompetitors[code])
  const hd = competitorStrList ? [...Object.keys(data[0]), ...competitorStrList] : [...Object.keys(data[0])]
  const headers = [...new Set(hd)]

  const csvRows = [
    headers.join(','),
    ...data.map(row => {
      return headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
    })
  ];
  return csvRows.join('\n')
}

export const handleFindProduct = (type: ModalType) => {
  modalStore.set({
    open: true,
    type,
    title: 'Find Product',
    description: 'Find product(s) by url or skus.',
    className: 'w-full max-w-2xl'
  });
};

export const copyText = async (text: string) => {
  try {
    setTimeout(async () => {
      await onCopy(text);
    }, 500);
  } catch (error: any) {
    toast.error(error.message);
  }
};
