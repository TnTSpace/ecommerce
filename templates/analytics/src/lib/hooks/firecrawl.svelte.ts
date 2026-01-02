import { competitorNames, Constants, CountryCompetitors } from "$lib/constants"
import type { iFirecrawlApis, iFirecrawlPollResult, iSKU, TCountryCode, TState } from "$lib/interface"
import { loadingStore } from "$lib/stores";
import { skuStore } from "$lib/stores";

export interface iScrape {
  url: string;
  name: string;
  sku: string;
  hits?: iScrapedProduct[];
  competitor: string;
}

export interface iFirecrawlStatus {
  message: string;
  state: TState
}

export interface iScrapedProduct {
  url: string;
  name: string;
  image: string;
  price: string;
  reference: string;
}


export class Firecrawl {
  private static instance: Firecrawl

  private scrapes: iScrape[] = []
  private currentIdx: number = 0
  private MAX_PER_MIN: number = 10 

  private initialStatus: iFirecrawlStatus = { message: "At rest", state: "idle" }
  status: iFirecrawlStatus = $state(this.initialStatus)

  private constructor() { }

  public static getInstance(): Firecrawl {
    if (!Firecrawl.instance) {
      Firecrawl.instance = new Firecrawl();
    }
    return Firecrawl.instance;
  }

  async getApis() {
    const response = await fetch('/api/firecrawl')
    const data = await response.json()
    return data as iFirecrawlApis
  }

  async process(products: iSKU[], code: TCountryCode) {
    products.forEach(product => {
      const json = CountryCompetitors[code]
      Object.keys(json).forEach(cName => {
        const competitor = json[cName]
        const url = competitor.getUrl(product)
        const competitorName = competitorNames.filter(name => url.indexOf(name) !== -1)[0]
        this.scrapes = [...this.scrapes, { url, name: product.name, sku: product.sku, competitor: competitorName }]
      })
    })

    const urls = this.scrapes.map(scrape => scrape.url)
    const names = this.scrapes.map(scrape => scrape.name)

    try {
      const apis: iFirecrawlApis = await this.getApis()
      const token = apis[code]

      console.log({ scrapes: this.scrapes, names, urls, apis, token })

      const body = JSON.stringify({
        urls,
        "prompt": `Extract the products on the page into a list of objects with the keys: name, image, product and price. Ensure you wait for the JavaScript of the page to render the product before you begin extracting the content. This is so you return products and not an empty list. Also attach a reference name from this list: ${names} to each object. If a product does not match any reference name in the list, don't include in the result`,
        "schema": {
          "type": "object",
          "properties": {
            "products": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "price": {
                    "type": "string"
                  },
                  "reference": {
                    "type": "string"
                  }
                },
                "required": [
                  "name",
                  "image",
                  "url",
                  "price",
                  "reference"
                ]
              }
            }
          },
          "required": [
            "products"
          ]
        },
        "agent": {
          "model": "FIRE-1"
        }
      })

      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body
      }
      this.status = { message: `Getting id...`, state: "pending" }
      const response = await fetch(Constants.FIRECRAWL_EXTRACT, options)
      const data = await response.json()

      this.status = { message: `Successfully obtained id for ${this.scrapes.length} products`, state: "success" }
      await this.poll(data.id, token)
    } catch (error: any) {
      this.status = { message: error.message, state: "error" }
    }
    this.currentIdx = this.currentIdx + this.MAX_PER_MIN
  }

  async scrape(products: iSKU[], code: TCountryCode) {
    this.scrapes = []

    const endIdx = this.currentIdx + this.MAX_PER_MIN
    const batch = products.slice(this.currentIdx, endIdx)

    await this.process(batch, code)

    this.scrapes.forEach(scrape => {
      const { competitor, hits, sku } = scrape
      skuStore.update(current => {
        let json: Record<string, any> = current.jumia[sku].competition ?? {}
        const newObj: Record<string, any> = {}
        newObj[competitor] = hits
        json = { ...json, ...newObj }
        current.jumia[sku].competition = json
        return current
      })
    })
  }

  async poll(firecrawlId: string, token: string) {

    let interval: any = 0
    let count: number = 0

    this.status = { message: `Obtaining products with AI`, state: "pending" }
    const url = `${Constants.FIRECRAWL_EXTRACT}/${firecrawlId}`

    interval = setInterval(async () => {
      console.log("fetching content", count)
      const options: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }
      const response = await fetch(url, options)
      const { status, data } = await response.json() as iFirecrawlPollResult
      if (status !== 'processing') {
        console.log("end fetch", status, data)
        const scrapedProducts = (data as any).products as iScrapedProduct[]
        this.scrapes = this.scrapes.map(item => {
          const hits = scrapedProducts.filter(product => product.reference === item.name)
          const json = { ...item, hits }
          return json
        })

        clearInterval(interval)
        this.status = { message: `Successfully Obtained Products`, state: "success" }
        setTimeout(() => {
          this.status = this.initialStatus

          console.log({ scrapes: this.scrapes })
        }, 2000);
        loadingStore.update(value => {
          value = false
          return value
        })
      } else {
        if (count > 5) {
          this.status = { message: `Processing products`, state: "pending" }
        } else {
          this.status = { message: `Obtaining products with AI`, state: "pending" }
        }
      }
      count++
    }, 10000);
  }

  getScrapes() {
  }
}

export const firecrawl = Firecrawl.getInstance()