import type { RefereeInterface, iMeta, iModal, iPopup } from "$lib/interface";
import { createPersistentStore } from "@toolsntuts/utils";
import { writable } from "svelte/store";

const modalStore = writable<iModal>({
  open: false,
  type: "referral",
  title: '',
  description: ''
})

const chatSidebarStore = writable({
  open: false
})

const popupStore = createPersistentStore<iPopup>('popup', {
  open: true,
  type: "newsletter",
  date: 'n/a'
})

const metaStore = writable<iMeta>({
  title: 'Study Abroad With Dhub Education',
  description: 'Empowering international education journeys!',
  ogimage: 'https://www.dhubeducation.com/screenshot-wide.webp',
  link: 'https://www.dhubeducation.com/',
  keywords: ['study', 'abroad', 'education', 'international', 'masters', 'first degree', 'Study Abroad']
});

const refereesStore = writable<RefereeInterface[]>([])

export { modalStore, chatSidebarStore, metaStore, popupStore, refereesStore }