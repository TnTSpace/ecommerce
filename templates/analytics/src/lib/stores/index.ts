import { Constants, DisplayType } from "$lib/constants/index";
import type { iFilter, iGenericCompetitor, iMeta, iModal, iSKUStore } from "$lib/interface";
import { createPersistentStore } from "@toolsntuts/utils";
import { writable } from "svelte/store";

const metaStore = writable<iMeta>({
  title: 'Jumia Analytics',
  description: 'Track product prices effortlessly',
  ogimage: 'https://jumia-analytics.vercel.app/logo.svg',
  link: 'https://jumia-analytics.vercel.app/',
  keywords: ['Jumia', 'product', 'prices']
});

const modalStore = writable<iModal>({
  type: 'competition',
  open: false,
  data: {},
  title: '',
  description: ''
})

export const initialFilter = {
  search: "",
  category: "",
  tag: "",
  express: false,
  brand: "",
  price: {
    min: 0,
    max: 0
  },
  discount: '0-100',
  rating: '0-5'
}
const filterStore = createPersistentStore<iFilter>("filterStore", initialFilter)

const initialSKU: iSKUStore = {
  reset: () => { },
  jumia: {},
  url: '',
  page: 1,
  // @ts-ignore
  displayType: "grid",
  country: {
    name: 'Nigeria',
    code: 'ng',
    locale: '.com.ng'
  }
}

const initialCompetitor: Record<string, iGenericCompetitor> = {}

const createSKUStore = () => {

  const store = createPersistentStore<iSKUStore>("skuStore", initialSKU)

  const { subscribe, set, update } = store

  const reset = (value?: iSKUStore) => {
    store.set(value ?? initialSKU)
    return store
  }

  return {
    subscribe, update, set, reset
  }
}

const skuStore = createSKUStore()

const createCleanupStore = () => {

  const store = createPersistentStore<iSKUStore>("cleanupStore", initialSKU)

  const { subscribe, set, update } = store

  const reset = (value?: iSKUStore) => {
    store.set(value ?? initialSKU)
    return store
  }

  return {
    subscribe, update, set, reset
  }
}


const createCompetitorStore = () => {

  const store = createPersistentStore<Record<string, iGenericCompetitor>>("competitorStore", initialCompetitor)

  const { subscribe, set, update } = store

  const reset = (value?: Record<string, iGenericCompetitor>) => {
    store.set(value ?? initialCompetitor)
    return store
  }

  return {
    subscribe, update, set, reset
  }
}

const cleanupStore = createCleanupStore()

const competitorStore = createCompetitorStore()

const redirectToStore = writable<string>('')

const loadingStore = writable<boolean>(false)

export { metaStore, skuStore, modalStore, redirectToStore, loadingStore, cleanupStore, filterStore, competitorStore }