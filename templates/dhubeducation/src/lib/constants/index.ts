import type { iBlog, iCampaign, iCourse, iPartner, iRoute, iService } from "$lib/interface";

export enum Constants {
  OWNER = '+447930739927',
  DOMAIN = "https://www.dhubeducation.com",
  REDIRECT = 'redirect'
}

export enum SocialMediaLinks {
  FACEBOOK = 'https://www.facebook.com/mydhubeducation/',
  INSTAGRAM = 'https://www.instagram.com/mydhubeducation/',
  TWITTER = 'https://twitter.com/DhubEducation',
  TIKTOK = 'https://www.tiktok.com/@mydhubeducation?_t=8jGuYP4VdSK&_r=1'
}

export enum eMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Role {
  ADMIN = "admin",
  CHILD = "child",
  TEACHER = "teacher",
  PARENT = "parent",
  GUEST = "guest"
}

export enum ModalType {
  CHAT = 'chat'
}

export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export enum eStreamMessage {
  TOKEN = 'token',
  ERROR = 'error',
  CONNECTED = 'connected',
  DONE = 'done',
  TOOLSTART = 'tool_start',
  TOOLEND = 'tool_end'
}

export const SSE_DATA_PREFIX = 'data: ' as const;
export const SSE_DONE_MESSAGE = '[DONE]' as const;
export const SSE_LINE_DELIMITER = '\n\n' as const;
export const SYSTEM_MESSAGE = `You are DHUB AI assistant that uses tools to help answer questions. You have access to several tools that can help you find information and perform tasks.

When using tools:
- Only use the tools that are explicitly provided
- For GraphQL queries, ALWAYS provide necessary variables in the variables field as a JSON string
- For youtube_transcript tool, always include both videoUrl and langCode (default "en") in the variables
- Structure GraphQL queries to request all available fields shown in the schema
- Explain what you're doing when using tools
- Share the results of tool usage with the user
- Always share the output from the tool call with the user
- If a tool call fails, explain the error and try again with corrected parameters
- never create false information
- If prompt is too long, break it down into smaller parts and use the tools to answer each part
- when you do any tool call or any computation before you return the result, structure it between markers like this:
  ---START---
  query
  ---END---

Tool-specific instructions:
1. youtube_transcript:
   - Query: { transcript(videoUrl: $videoUrl, langCode: $langCode) { title captions { text start dur } } }
   - Variables: { "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID", "langCode": "en" }

2. google_books:
   - For search: { books(q: $q, maxResults: $maxResults) { volumeId title authors } }
   - Variables: { "q": "search terms", "maxResults": 5 }

   refer to previous messages for context and use them to accurately answer the question
`;

export const helpCenter: iRoute[] = [
  {
    name: 'About Us',
    href: '/about'
  },
  {
    name: 'Privacy Policy',
    href: '/privacy-policy'
  },
  {
    name: 'Terms of Use',
    href: '/terms-of-use'
  },
  {
    name: 'Cookie Policy',
    href: '/cookie-policy'
  }
]

export const cxp = [...helpCenter].map(item => item.href)


export const footerExclusionList = [...cxp, '/blogs/*', '/courses/*', '/campaigns/*', '/services/*', '/partners/*', '/referral-program/*']

export function isExcludedFromFooter(path: string): boolean {
  return footerExclusionList.some(pattern => {
    if (pattern.endsWith('/*')) {
      const basePath = pattern.slice(0, -2); // Remove /* from the end
      return path.startsWith(basePath);
    }
    return path === pattern;
  });
}


export const imagePreviewableFormats = [
  "jpeg",
  "jpg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "ico",
  "webp",
  "jxr",
  "wdp",
  "heic",
  "avif",
  "jp2",
  "jpc",
];

export const iframePreviewableFormats = [
  "html", "pdf", "txt", "rtf", "doc", "docx", "odt", "xml", "json", "csv",
  "mp4", "mp3", "wav", "ogg", "webm", "flv",
  "swf", "ppt", "pptx", "xls", "xlsx", "php", "jsp"
];

export const audioPreviewableFormats = [
  "mp3", "wav", "ogg", "aac", "flac", "m4a", // Common audio formats
  "weba", // WebM audio
  "opus"  // Opus audio
  // Add other less common formats as needed
];

export const videoFormats = ['mp4', 'webm', 'flv', 'mov', 'avi', 'wmv', 'mkv']


export const educationlist = [
  { value: 'a-level', label: 'A-Level' },
  { value: 'foundation', label: 'Foundation' },
  { value: 'hnd', label: 'HND' },
  { value: 'ond', label: 'OND' },
  { value: 'top up', label: 'Top Up' },
  { value: 'bsc', label: 'BSc' },
  { value: 'pre-msc', label: 'Pre-MSc' },
  { value: 'msc', label: 'MSc' },
  { value: 'phd', label: 'PhD' }
];

export const genderlist = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

export const preferredday = [
  { value: 'weekday evening', label: 'Weekday Evening' },
  { value: 'weekend afternoon', label: 'Weekend Afternoon' }
];

export const courseformat = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'google meet', label: 'Google Meet' },
  { value: 'teams', label: 'Teams' }
];

const categoryOrder = new Map<string, number>()
categoryOrder.set("General Questions", 1)
categoryOrder.set("University Selection & Application", 2)
categoryOrder.set("Scholarship & Loan", 3)
categoryOrder.set("Immigration & Visa", 4)
categoryOrder.set("Pre Departure & Arrival Support", 5)

export { categoryOrder }

export const imageSrcSet = "?w=480;1024;1920&format=webp&as=srcset"



export const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
];

export const referralTypeOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Employee', value: 'employee' },
  { label: 'Influencer', value: 'influencer' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Vendor', value: 'vendor' }
]

export const refereeCourseOptions = [
  { label: 'A-Level', value: 'A-Level' },
  { label: 'Foundation', value: 'Foundation' },
  { label: 'HND', value: 'HND' },
  { label: 'OND', value: 'OND' },
  { label: 'Top-Up', value: 'Top-Up' },
  { label: 'BSc', value: 'BSc' },
  { label: 'Pre-MSc', value: 'Pre-MSc' },
  { label: 'MSc', value: 'MSc' },
  { label: 'PhD', value: 'PhD' },
];

export const defaultCampaign: Partial<iCampaign> = {
  title: '',
  description: '',
  content: '',
  startDate: '',
  endDate: '',
  file: ''
}

export const defaultService: Partial<iService> = { 
  name: '',
  description: '',
  file: '',
  slug: '',
  content: ''
}

export const defaultPartner: Partial<iPartner> = {
  name: '',
  website: '',
  file: '',
  type: '',
  country: '',
  content: ''
}

export const defaultCourse: Partial<iCourse> = {
  title: '', 
  name: '',
  description: '',
  file: '',
  slug: '',
  content: ''
}

export const defaultBlog: Partial<iBlog> = {
  title: '',
  description: '',
  content: '',
  slug: '',
  file: ''
}