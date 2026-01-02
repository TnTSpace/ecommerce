import { google } from 'googleapis'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN } from '$env/static/private'
import { onError, onSuccess } from '@toolsntuts/utils'

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

const drive = google.drive({
  version: 'v2',
  auth: oauth2Client
})

export const uploadFileToGoogleDrive = async (csvContent: string) => {
  const fileMetadata = {
    name: 'data.csv',
    mimeType: 'application/vnd.google-apps.spreadsheet'
  }

  const media = {
    mimeType: 'text/csv',
    body: csvContent
  }
  try {
    const response = await drive.files.insert({
      requestBody: {
        ...fileMetadata
      },
      media
    })

    console.log(response.data)
    const fileId = response.data.id
    const url = `https://docs.google.com/spreadsheets/d/${fileId}/edit`
    return onSuccess({ fileId, url })
  } catch (error: any) {
    return onError(error.message)
  }
}