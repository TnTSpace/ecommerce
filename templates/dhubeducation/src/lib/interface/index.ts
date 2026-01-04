import type { Role, eStreamMessage } from "$lib/constants";
import type { Doc, Id } from "$lib/convex/_generated/dataModel";
import { type AccordionItem } from "melt/builders";
import type { CountryCode } from "svelte-tel-input/types";


type ModalType = "referral" | "referee" | "deleteReferee"

type PopupType = "newsletter" | "banner"

export type MessageRoleType = "user" | "assistant"

export type TCollection = "services" | "slides" | "referrals" | "blog" | "schools"


export type TReferral = "employee" | "vendor" | "teacher" | "customer" | "influencer"

export type TService = "referral program" | "tuition payment" | "accommodation" | "dhub career" | "guardianship" | "immigration & recruitment"

export type TPlayMedia = "play-video" | "play-audio" | "play-image" | "play-newsletter"

export type FileType = 'audio' | 'video' | 'file' | 'image'


export interface iBaseStreamMessage {
  type: eStreamMessage
}

export interface TokenMessage extends iBaseStreamMessage {
  type: eStreamMessage.TOKEN;
  token: string;
}

export interface ErrorMessage extends iBaseStreamMessage {
  type: eStreamMessage.ERROR,
  error: string;
}

export interface ConnectedMessage extends iBaseStreamMessage {
  type: eStreamMessage.CONNECTED
}

export interface DoneMessage extends iBaseStreamMessage {
  type: eStreamMessage.DONE
}

export interface ToolStartMessage extends iBaseStreamMessage {
  type: eStreamMessage.TOOLSTART;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends iBaseStreamMessage {
  type: eStreamMessage.TOOLEND;
  tool: string;
  output: unknown
}

export type StreamMessage = TokenMessage | ErrorMessage | ConnectedMessage | DoneMessage | ToolStartMessage | ToolEndMessage


export interface iXata {
  xata_createdat: Date;
  xata_updatedat: Date;
  xata_version: number;
  xata_id: string;
}

export interface iUser extends iXata {
  email: string;
  image: string;
  name: string;
  nameTag: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: Role
}

export interface iRegistration extends iXata {
  name: string;
  email: string;
  phone: string;
  country: string;
  type: string;
  data: string;
}

export interface iReferral extends iXata {
  name: string;
  email: string;
  phone: string;
  country: string;
  type: string;
  data: string;
  referrer: string;
}

export interface iRoute {
  name: string;
  href: string;
  icon?: any;
  isAuthorized?: boolean
}

export interface iTeam {
  name: string;
  logo: any
  plan: string;
}

export interface iModal {
  type: ModalType,
  title: string;
  description: string;
  open: boolean;
  data?: any
}

export interface iPopup {
  type: PopupType,
  open: boolean;
  data?: any;
  date: string;
}

export interface iNewsletter {
  email: string;
}

export interface Message {
  role: MessageRoleType;
  content: string;
}

export interface iChatRequestBody {
  messages: Message[],
  newMessage: string;
  chatId: Id<"chats">
}
export interface iMeta {
  title: string;
  keywords: string[];
  description: string;
  ogimage: string;
  link: string;
}
export interface iReview {
  name: string;
  image: string;
  review: string;
  rating: string;
}


export interface iHero {
  title: string;
  subline?: string[];
  cta: boolean;
  href?: string;
  isHome?: boolean;
  height?: string;
  backgroundImage?: string;
}


export interface iSlider {
  order: number;
  background: string;
  title: string;
  subline: string;
  href: string;
  text: string;
}


export interface iImage extends iXata {
  url: string;
  fileId: string;
}

export interface iFile extends iXata {
	url: string;
	fileId: string;
	size: string;
	type: FileType
}

export interface iService extends iXata {
  name: string;
  description: string;
  file: string | iFile;
  slug: string;
  content?: any;
}

type iServiceWithoutOrderAndName = Omit<iService, 'order' | 'name'>;

export interface iBlog extends iServiceWithoutOrderAndName {
  title: string
}

export interface iCampaign extends iXata {
  title: string;
  description: string;
  content?: any
  startDate: string;
  endDate: string;
  file: string | iFile
}

export interface iPartner extends iXata {
  name: string;
  website: string;
  file: string | iImage;
  type: string;
  country: string;
  content: any;
}

export interface iFaq extends iXata {
  category: string;
  question: string;
  answer: string;
}

export interface iAccordion {
  question: string;
  answer: string;
}

export interface iCourse extends iService {
  title: string;
}

export interface iUpload {
  url: string;
  fileType: FileType;
  fileId: string;
}


export interface iAccordionItem extends AccordionItem<{
  title: string;
  description: string;
}> { }

export interface iSection {
  id: string;
  title: string;
  content: string;
}


export interface iReferral {
  type: string;
  caption: string;
  squarepic: string;
  landscapepic: string;
  body?: {
    type: string;
    children: Record<string, any>[]
  }
  content?: any;
  slug: string;
}

export interface iReferralData {
  paypalEmail: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode: string;
  swiftCode: string;
  type: 'Customer' | 'Teacher' | 'Employee' | 'Vendor' | 'Influencer';
  country: string;
}

export interface iRefereeData {
  country: CountryCode;
  course: 'A-Level' | 'Foundation' | 'HND' | 'OND' | 'Top-Up' | 'BSc' | 'Pre-MSc' | 'MSc' | 'PhD';
  courseName: string;
}


export interface iReferralCommon {
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

export interface ReferralInterface extends iXata, iReferralCommon {
  data: string | iReferralData
}

export interface RefereeInterface extends iXata, iReferralCommon {
  data: string | iRefereeData;
  referral: string | ReferralInterface;
}