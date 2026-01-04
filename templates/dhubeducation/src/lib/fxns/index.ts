import { audioPreviewableFormats, Constants, eStreamMessage, imagePreviewableFormats, SSE_DATA_PREFIX, SSE_DONE_MESSAGE, videoFormats } from "$lib/constants"
import type { ReferralInterface, FileType, iRefereeData, iSlider, RefereeInterface, StreamMessage } from "$lib/interface"
import { slugify } from "@toolsntuts/utils"
import showdown from 'showdown'
import matter from "gray-matter";
import type { iSection } from "$lib/interface";
import { normalizedCountries } from "svelte-tel-input";

const getParsed = (line: string) => {
  const trimmed = line.trim()
  if (!trimmed || !trimmed.startsWith(SSE_DATA_PREFIX)) return null

  const data = trimmed.substring(SSE_DATA_PREFIX.length)

  if (data === SSE_DONE_MESSAGE) return { type: eStreamMessage.DONE }

  try {
    const parsed = JSON.parse(data) as StreamMessage
    return Object.values(eStreamMessage).includes(parsed.type)
     ? parsed
     : null
  } catch (error: any) {
    return {
      type: eStreamMessage.ERROR,
      error: "Failed to parse SSE message"
    }
  }
}

/**
 * Creates a parser for Server-Sent events (SSE) streams.
 * SSE allows real-time updates from server to client
 */
export const createSSEParser = () => {
  let buffer = ""

  const parse = (chunk: string): StreamMessage[] => {
    // Combine buffer with new chunk and split into lines
    const lines = (buffer + chunk).split("\n")

    // Save last potentially incomplete line
    buffer = lines.pop() || ""

    return lines
    .map(getParsed)
    .filter((msg): msg is StreamMessage => msg !== null)
  }

  return { parse }
}

export const processStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onChunk: (chunk: string) => Promise<void>
) => {
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break;
      await onChunk(new TextDecoder().decode(value))
    }
  } finally {
    reader.releaseLock()
  }
}

const formatToolOutput = (output: unknown): string => {
  if (typeof output === "string") return output;
  return JSON.stringify(output, null, 2);
};

export const formatTerminalOutput = (tool: string, input: unknown, output: unknown) => {
  const terminalHtml = `<div class="bg-[#1e1e1e] text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
  <div class="flex items-center gap-1.5 border-b border-gray-700 pb-1">
    <span class="text-red-500">●</span>
    <span class="text-yellow-500">●</span>
    <span class="text-green-500">●</span>
    <span class="text-gray-400 ml-1 text-sm">~/${tool}</span>
  </div>
  <div class="text-gray-400 mt-1">$ Input</div>
  <pre class="text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(input)}</pre>
  <div class="text-gray-400 mt-2">$ Output</div>
  <pre class="text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(output)}</pre>
</div>`;

return `---START---\n${terminalHtml}\n---END---`;
}

export const createWhatsAppUrl = (msg: string) => {
  const url = new URL("https://api.whatsapp.com/send/")
  url.searchParams.set('phone', Constants.OWNER)
  url.searchParams.set('text', msg)
  return url.href
}


export const getMetadata = (paths: Record<string, any>) => {

  const objList = []
  for (const path in paths) {
    const file = paths[path] as Record<string, any>
    const slug = slugify(path) as string

    if (
      file && 
      typeof file === 'object' && 
      'metadata' in file && 
      slug
    ) {
      const metadata = file.metadata as Omit<iSlider, 'slug'>
      objList.push({ ...metadata })
    }
  }

  return objList
}

export const getDescription = (str: string) => `${str} (study abroad, international education, study abroad programs, study overseas, study abroad scholarships, study abroad destinations, study abroad opportunities, study abroad experiences, study abroad benefits, best countries to study abroad, study abroad universities, study abroad consultants, study abroad costs, study abroad tips, study abroad application process, study abroad grants, study abroad internships, study abroad reviews, study abroad experiences blog) #studyabroadlife #studentlife #education #studymotivation #educationconsultant #educationagency #viral #trend #reels #reelsinstagram #canadian #studyincanada #studentaccommodation #studenthousing #canada 🇨🇦 #canada #nigerians #nigeriansincanada #immigration #london #unitedkingdom #immigrationcanada #pr`

export const getOgImage = (partialImage: string) => `${Constants.DOMAIN}${partialImage}`


export function parseMarkdownSections(markdown: string) {
  const converter = new showdown.Converter();

  // ✅ Parse frontmatter and extract only the content
  const { content } = matter(markdown); 

  const lines = content.split("\n");

  let sections = [];
  let currentSection = { id: "introduction", title: "Introduction", content: "" };

  const headingRegex = /^(#{1,6})\s+(.*)/; // Match headings like #, ##, ###, etc.

  for (let line of lines) {
    const match = line.match(headingRegex);

    if (match) {
      // Push previous section before starting a new one
      if (currentSection.content.trim()) {
        currentSection.content = converter.makeHtml(currentSection.content);
        sections.push(currentSection);
      }

      // Create a new section
      const title = match[2].trim();
      currentSection = {
        id: title.toLowerCase().replace(/\s+/g, "-"),
        title,
        content: ""
      };
    } else {
      currentSection.content += line + "\n";
    }
  }

  // Push the last section
  if (currentSection.content.trim()) {
    currentSection.content = converter.makeHtml(currentSection.content);
    sections.push(currentSection);
  }

  return sections;
}


export function getFileType(filename: string): FileType {
  // Extract file extension and convert to lowercase
  const extension = filename.split('.').pop()?.toLowerCase() || '';

  if (imagePreviewableFormats.includes(extension)) {
    return 'image';
  }

  if (videoFormats.includes(extension)) {
    return 'video';
  }

  if (audioPreviewableFormats.includes(extension)) {
    return 'audio';
  }

  return 'file';
}

export function convertHtmlToSections(htmlString: string): iSection[] {
  const sections: iSection[] = [];
  const regex = /<(h[1-6])>(.*?)<\/\1>/gi;
  let match;
  let lastIndex = 0;
  
  while ((match = regex.exec(htmlString)) !== null) {
    let [fullMatch, , title] = match;
    title = title.replace(/<strong>(.*?)<\/strong>/gi, "$1"); // Remove <strong> tags in headings
    const id = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const contentStart = match.index + fullMatch.length;
    
    if (sections.length > 0) {
      sections[sections.length - 1].content = htmlString.substring(lastIndex, match.index)
        .replace(/<strong>(.*?)<\/strong>/gi, "$1") // Remove <strong> tags
        .replace(/\*\*|\*/g, "") // Remove markdown bold/italic symbols
        .trim();
    }
    
    sections.push({ id, title, content: "" });
    lastIndex = contentStart;
  }
  
  if (sections.length > 0) {
    sections[sections.length - 1].content = htmlString.substring(lastIndex)
      .replace(/<strong>(.*?)<\/strong>/gi, "$1") // Remove <strong> tags
      .replace(/\*\*|\*/g, "") // Remove markdown bold/italic symbols
      .trim();
  }
  
  return sections;
}

export const getRefereeData = (data: string) => JSON.parse(data as string) as iRefereeData

export const flattenReferee = (referee: RefereeInterface) => {
  const referral = (referee.referral as ReferralInterface).name
  const refereeData = getRefereeData(referee.data as string)
  const countryName = normalizedCountries.find((a) => a.iso2 == refereeData.country)
  const flatten = {
    xata_id: referee.xata_id,
    name: referee.name,
    email: referee.email,
    phone: referee.phone,
    referral,
    countryName: countryName?.name,
    ...refereeData
  }
  return flatten
}

export function toDatetimeLocal(dateString: string): string {
  const date = new Date(dateString);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function capitalize(word: string) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
