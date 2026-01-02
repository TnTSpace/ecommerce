import { CompetitorMetadata } from "$lib/constants";
import { slugify } from "$lib/fxns";
import type { iGenericCompetitor, iKongaProduct, iSKU, iSlotItem, TCountryLocale } from "$lib/interface";
import { skuStore } from "$lib/stores";
import { get } from "svelte/store";
import { parseSrcset } from 'srcset'

export interface iPageUrlStats {
  currentPage: number;
  maxPage: number;
  products: number;
}

export interface iProductSkuStats {
  valid: number;
  oos: number;
  products: number;
}

export class Finder {
  private static instance: Finder
  private host = 'https://www.jumia'
  private initialPageUrlStats = {
    currentPage: 0,
    maxPage: 1,
    products: 0
  }

  public fail = $state(0)
  public pass = $state(0)
  public total = $state(0)

  private initialProductSkuStats = {
    valid: 0,
    oos: 0,
    products: 0
  }

  private constructor() { }

  static normalize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, '') // Remove punctuation
      .split(/\s+/)
      .filter(Boolean);
  }

  static levenshtein(a: string, b: string): number {
    const dp = Array.from({ length: a.length + 1 }, (_, i) =>
      Array.from({ length: b.length + 1 }, (_, j) =>
        i === 0 ? j : j === 0 ? i : 0
      )
    );

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return dp[a.length][b.length];
  }

  static fuzzyMatchScore(searchWord: string, targetWord: string): number {
    const distance = Finder.levenshtein(searchWord, targetWord);
    const maxLen = Math.max(searchWord.length, targetWord.length);
    return 1 - distance / maxLen; // similarity score between 0 and 1
  }

  static isFuzzyMatch(search: string, product: iGenericCompetitor, threshold = 0.7): boolean {
    const searchTokens = Finder.normalize(search);
    const titleTokens = Finder.normalize(product.title);

    let matchCount = 0;

    for (const word of searchTokens) {
      const bestMatchScore = Math.max(
        ...titleTokens.map(token => Finder.fuzzyMatchScore(word, token))
      );
      if (bestMatchScore >= threshold) {
        matchCount++;
      }
    }

    return matchCount >= Math.floor(searchTokens.length * 0.9); // at least 70% match
  }

  static searchProducts(products: iGenericCompetitor[], query: string): iGenericCompetitor[] {
    return products.filter(product => Finder.isFuzzyMatch(query, product));
  }


  public static getUrl(locale: TCountryLocale, path: string) {
    return `https://www.jumia${locale}${path}`
  }

  public static getInstance(): Finder {
    if (!Finder.instance) {
      Finder.instance = new Finder();
    }
    return Finder.instance;
  }

  private getDefaultSKU(sku: string) {
    return {
      "sku": sku,
      "name": "out of stock",
      "displayName": "out of stock",
      "brand": "oos",
      "sellerId": 0,
      "isShopGlobal": true,
      "categories": ["out of stock"],
      "prices": {
        "rawPrice": "0",
        "price": "N 0,000",
        "priceEuro": "0",
        "taxEuro": "0",
        "oldPrice": "0",
        "oldPriceEuro": "0",
        "discount": "0"
      },
      "stock": {
        "percent": 0,
        "text": "0 items left"
      },
      "rating": {
        "average": 0,
        "totalRatings": 0
      },
      "image": "https://ng.jumia.is/cms/0-1-weekly-cps/onsite-report/floor-product-templatev2.jpg",
      "url": '/catalog/?q=' + sku,
      "isBuyable": true,
      "shopGlobal": {
        "identifier": "global",
        "name": "Shipped from abroad"
      },
      "selectedVariation": sku
    }
  }

  // 2
  private appendPageToUrl(href: string, page: number) {
    const url = new URL(href)
    url.searchParams.append("page", page.toString())
    return url.href
  }

  private PDP(products: any) {
    const fetched = document.getElementById('fetched') as HTMLDivElement
    fetched.innerHTML = products
    const scripts = fetched.querySelectorAll('script')
    fetched.innerHTML = ''
    const script = Array.from(scripts).find(script => script.innerHTML.includes("window.__INITIAL_STATE__="))
    return script
  }

  private extractPDP(text: string) {
    const script = this.PDP(text)
    return script
  }

  private async collectPDP(url: string) {
    try {
      const response = await fetch(url)
      const text = await response.text()
      const script = this.extractPDP(text)

      if (script) {
        const matches = Finder.extractValidPDPMatches(script.innerHTML)
        const match = matches[0] as any
        return match.viewData
      } else {
        console.info("Product details not found")
        return ''
      }
    } catch (error: any) {
      console.info(error.message)
      return ''
    }
  }

  // 3
  private async collect(url: string) {
    try {
      const response = await fetch(url)
      const text = await response.text()
      const extracted = this.extractProducts(text)
      return extracted as iSKU[]
    } catch (error) {
      console.trace(error)
      return []
    }
  }

  // 5
  private products(products: any) {
    const fetched = document.getElementById('fetched') as HTMLDivElement
    fetched.innerHTML = products
    const scripts = fetched.querySelectorAll('script')
    fetched.innerHTML = ''
    const textC = Array.from(scripts).map(script => script.innerHTML)
    const foundIdx = textC.findIndex(script => script.indexOf('"products":[{') !== -1)
    return textC[foundIdx]
  }

  private mobile(skus: string) {
    const products = Finder.extractValidJsonMatches<iSKU>(skus)
    return products
  }

  // 6
  private format(products: string) {

    if (!this.isMobileDevice()) {
      const productStr = this.desktop(products)
      return JSON.parse(productStr).products
    } else {
      return this.mobile(products)
    }
  }
  escape(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  private braceIndices(str: string, brace: string) {
    var regex = new RegExp(brace, "gi"), result, indices = []
    while ((result = regex.exec(str))) {
      indices.push(result.index)
    }
    return indices
  }
  private desktop(rawProducts: string) {
    const start = rawProducts.indexOf('"products":')
    const products = '{' + rawProducts.substring(start, rawProducts.length)
    const closingBraceIndices = this.braceIndices(products, this.escape("}]"))
    const lastIdx = closingBraceIndices[closingBraceIndices.length - 1]
    return products.substring(0, lastIdx + 2) + '}'
  }

  // 4
  private extractProducts(text: string) {
    const rawProducts = this.products(text)
    const formatted = this.format(rawProducts)

    return formatted
  }
  rangeArray(n: number): number[] {
    if (n < 1) return []
    return Array.from({ length: n }, (_, i) => i + 1)
  }

  resetStats() {
    this.fail = 0
    this.pass = 0
    this.total = 0
  }

  async handleCollectUrl(url: string) {

    const result = await this.collect(url)

    if (result.length) {
      this.pass = this.pass + 1
    } else {
      this.fail = this.fail + 1
    }
    return result
  }
  // 1
  async findProductsByUrl(href: string, page: number) {
    this.resetStats()
    this.total = page
    const urls = this.rangeArray(page).map(pg => this.appendPageToUrl(href, pg))
    const promises = urls.map(this.handleCollectUrl.bind(this))
    const results = await Promise.all(promises)
    let products: iSKU[] = []

    results.forEach(result => {
      products = [...products, ...result]
    })
    return products
  }

  isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // sku #1
  async findProductBySkus(list: string[]) {
    this.resetStats()
    this.total = list.length
    const results = await this.collectSKUData(list)
    return results
  }

  async extractPDPDescription(url: any) {
    const pdp = await this.collectPDP(url)
    return this.stripHTMLTags(pdp?.description?.text) ?? ''
  }

  async getPDP(locale: TCountryLocale, list: iSKU[]) {
    const promise = async (product: iSKU) => {
      const path = product.url
      const url = Finder.getUrl(locale, path)

      try {
        const details = await this.extractPDPDescription(url)
        product.details = details
        return product
      } catch (error: any) {
        console.trace(error.message)
        return product
      }
    }

    const promises = list.map(promise)

    const products = await Promise.all(promises)

    return products
  }

  private buildProductUrl(locale: TCountryLocale, sku: string) {
    const href = this.host + locale + '/catalog/'
    const url = new URL(href)
    url.searchParams.set('q', sku)
    return url.href
  }

  private async handleCollectSKU(sku: string) {
    const store = get(skuStore)
    const url = this.buildProductUrl(store.country.locale, sku)
    try {
      const product = await this.collect(url)
      if (product.length) {
        this.pass = this.pass + 1
      } else {
        this.fail = this.fail + 1
      }
      // return product[0] ? product[0] : this.getDefaultSKU(sku)
      return product[0]
    } catch (error: any) {
      console.trace(error.message)
      this.fail = this.fail + 1
      return this.getDefaultSKU(sku)
    }
  }
  // sku #2
  async collectSKUData(list: string[]) {
    const promises = list.map(this.handleCollectSKU.bind(this))
    const products = await Promise.all(promises)
    return products.filter(sku => sku !== undefined) as iSKU[]
  }

  /**
 * Removes all HTML/XML tags from a string.
 * @param str - The input string potentially containing HTML tags.
 * @returns A clean string without any HTML tags.
 */
  stripHTMLTags(str: string): string {
    return str.replace(/<[^>]*>/g, '');
  }
  static extractValidPDPMatches<T>(input: string): T[] {
    let matches: T[] = []
    let depth = 0
    let start = -1

    for (let i = 0; i < input.length; i++) {
      const char = input[i]

      if (char === '{') {
        if (depth === 0) start = i
        depth++
      } else if (char === '}') {
        depth--
        if (depth === 0 && start !== -1) {
          const jsonString = input.slice(start, i + 1)
          try {
            const parsed = JSON.parse(jsonString)
            if (parsed) {
              matches.push(parsed)
              break
            }
          } catch {

          }
          start = -1
        }
      }
    }

    return matches
  }

  static extractValidJsonMatches<T>(input: string): T[] {
    let matches: T[] = []
    let depth = 0
    let start = -1

    for (let i = 0; i < input.length; i++) {
      const char = input[i]

      if (char === '{') {
        if (depth === 0) start = i
        depth++
      } else if (char === '}') {
        depth--
        if (depth === 0 && start !== -1) {
          const jsonString = input.slice(start, i + 1)
          try {
            const parsed = JSON.parse(jsonString)
            if (parsed.viewData) {
              matches = parsed.viewData ? parsed.viewData.products : []
              break
            }
          } catch {

          }
          start = -1
        }
      }
    }

    return matches
  }

  static extractJson<T>(input: string): T[] {
    let matches: T[] = []
    let depth = 0
    let start = -1

    for (let i = 0; i < input.length; i++) {
      const char = input[i]

      if (char === '{') {
        if (depth === 0) start = i
        depth++
      } else if (char === '}') {
        depth--
        if (depth === 0 && start !== -1) {
          const jsonString = input.slice(start, i + 1)
          try {
            const parsed = JSON.parse(jsonString)
            matches.push(parsed)
          } catch (error: any) {
            console.info("*****Error:", error.message)
          }
          start = -1
        }
      }
    }

    return matches
  }

  static cleanEscapedJsonString(input: string): string {
    // Remove backslashes before double quotes
    let cleaned = input.replace(/\\"/g, '"');

    // Remove backslashes before forward slashes
    cleaned = cleaned.replace(/\\\//g, '/');

    // Remove any remaining backslashes
    cleaned = cleaned.replace(/\\(?!["\\/bfnrtu])/g, '');

    return cleaned;
  }
  static extractNumberFromPrice(
    price: string,
    thousands: string = ',',
    decimals: string = '.'
  ): number {
    const regexp = new RegExp(
      "[+-]?\\d+(?:[" + thousands + "]\\d{3})*(?:[" + decimals + "]\\d+)?",
      'g'
    );
    const match = price.match(regexp);
    if (!match) return 0;
    const numStr = match[0].replace(new RegExp('[' + thousands + ']', 'g'), '');
    const result = parseFloat(numStr);
    return isNaN(result) ? 0 : result;
  }

  static jijiExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const masonryItems = el.querySelectorAll('.masonry-item')


    let hits: iGenericCompetitor[] = []

    masonryItems.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.qa-advert-list-item')?.getAttribute('href') ?? ''
      href = `${CompetitorMetadata.JIJI_NG_PDP}${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.qa-advert-price')?.textContent ?? '')
      const title = el.querySelector('.qa-advert-title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static jiji() {

  }

  static diardzairExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.card-product')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.parentElement?.getAttribute('href') ?? ''
      href = `https://new.diardzair.com.dz${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.title-product')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static kongaExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const masonryItems = el.querySelectorAll('.List_listItem__KlvU2')


    let hits: iGenericCompetitor[] = []

    masonryItems.forEach((el, i) => {
      const image = el.querySelector('picture > img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.ListingCard_listingCardContainer__C21gD a')?.getAttribute('href') ?? ''
      href = `${CompetitorMetadata.KONGA_PDP}${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.shared_price__gnso_')?.textContent ?? '')
      const title = el.querySelector('.ListingCard_productTitle__9Kzxv')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static ultrapcExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product-miniature')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.product-thumbnail')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-title a')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static marjanemallExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product-item-info')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img.product-image-photo')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.product-item-photo')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-item-link')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static footlandExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product-wrapper')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.product-image-link')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.amount')?.textContent ?? '')
      const title = el.querySelector('.wd-entities-title a')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static decathlonExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.js-product-card')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.js-product-card-link')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.price_amount')?.textContent ?? '')
      const title = el.querySelector('.u-typo-body-s')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static electroplanetExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product-item')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img.product-image-photo')?.getAttribute("src") ?? ''
      let href = el.querySelector('.product-item-photo')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-name')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static irisExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product_item')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.product-thumbnail')?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-title a')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static soumariExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('img')?.parentElement?.getAttribute('href') ?? ''

      const price = Finder.extractNumberFromPrice(el.querySelector('.amount')?.textContent ?? '')
      const title = el.querySelector('.woo-loop-product__title a')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };
  static tonatonExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product__container')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('.product__item')?.getAttribute('href') ?? ''
      href = `https://tonaton.com${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.product__title')?.textContent ?? '')
      const title = el.querySelector('.product__description')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static momomarketExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.mtn-product-card')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img.mtn-product-card__product-image')?.getAttribute("src") ?? ''
      let href = 'https://market.momo.africa/Portal/#'
      const price = Finder.extractNumberFromPrice(el.querySelector('.mtn-product-card__product-details__price')?.textContent ?? '')
      const title = el.querySelector('.mtn-product-card__product-details__title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static abanistaExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product.type-product')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.woocommerce-LoopProduct-link')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.amount')?.textContent ?? '')
      const title = el.querySelector('.woocommerce-loop-product__title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static dombeloExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.product.type-product')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.woocommerce-LoopProduct-link')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.amount')?.textContent ?? '')
      const title = el.querySelector('.woocommerce-loop-product__title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static temuExtractScripts(data: string) {
    const items = Array.from(document.querySelectorAll(".EKDT7a3v")).map(el => {

      const image = el.querySelector(".goods-img-external")?.getAttribute("src") ?? ''
      const title = el.querySelector("._2BvQbnbN")?.textContent ?? ''
      const href = el.querySelector("._2Tl9qLr1")?.getAttribute("href") ?? ''
      const price = el.querySelector("._2de9ERAH")?.textContent ?? ''
      const oldPrice = el.querySelector("._3TAPHDOX")?.textContent ?? ''
      const id = el.querySelector("._6q6qVUF5")?.getAttribute("data-tooltip")?.replace("goodContainer-", "") ?? ''
      const brand = el.querySelector("._1_Gt2q_G")?.textContent ?? ''

      return { image, href, price, oldPrice, id, brand }
    }).filter(sku => sku.brand.toLowerCase().indexOf("xiaomi") !== -1)
  }


  static kilimallExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const items = el.querySelectorAll('.listing-item')


    let hits: iGenericCompetitor[] = []

    items.forEach((el, i) => {
      const image = el?.getAttribute("src") ?? ''
      let href = el.querySelector('a')?.getAttribute('href') ?? ''
      href = `https://www.kilimall.co.ke${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.product-price')?.textContent ?? '')
      const title = el.querySelector('.product-title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static babikenExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('app-product-card')


    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img.card-img-top')?.getAttribute("src") ?? ''
      let href = el.querySelector('a')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.text-truncate')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static djokExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.product-item')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.image_product')?.getAttribute('href') ?? ''
      href = `https://djokstore.ci/${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.price .current')?.textContent ?? '')
      const title = el.querySelector('.product-collection__title')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static amazonExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('div[role="listitem"]')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img.s-image')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.a-link-normal')?.getAttribute('href') ?? ''
      href = `https://www.amazon.eg${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.a-price-whole')?.textContent ?? '')
      const brand = el.querySelector('h2.a-size-mini span')?.textContent ?? ''
      const name = el.querySelector('h2.a-size-base-plus span')?.textContent ?? ''

      const title = `${brand} ${name}`

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static noonExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.ProductBoxLinkHandler_linkWrapper__b0qZ9')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img.ProductImageCarousel_productImage__jtsOn')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.ProductBoxLinkHandler_productBoxLink__FPhjp')?.getAttribute('href') ?? ''
      href = `https://www.noon.com${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.Price_amount__2sXa7')?.textContent ?? '')
      const title = el.querySelector('.ProductDetailsSection_title__JorAV')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static btechExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.product-item-view')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img.product-image-photo')?.getAttribute("src") ?? ''
      let href = el.querySelector('a')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.price-wrapper')?.textContent ?? '')
      const title = el.querySelector('.plpTitle')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static twobExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.product-item')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img.product-image-photo')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.product-item-link')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-item-link')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };


  static carrefourExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.product_card_image_container')

    let hits: iGenericCompetitor[] = []

    productItems.forEach((container, i) => {
      const el = container.parentElement as HTMLElement
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.product-card-original-price>div>div:first-child')?.textContent ?? '')
      const title = el.querySelector('a[data-testid="product_name"]')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static slotExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.product-item')


    let hits: iSlotItem[] = []

    productItems.forEach((el, i) => {
      const image = el.querySelector('img')?.getAttribute("src") ?? ''
      let href = el.querySelector('a.product-item-photo')?.getAttribute('href') ?? ''
      const price = Finder.extractNumberFromPrice(el.querySelector('.price')?.textContent ?? '')
      const title = el.querySelector('.product-item-link')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };

  static getLargestImageUrl(srcset: string): string | null {
    const parsed = parseSrcset(srcset);

    // Filter out entries without a width descriptor
    const withWidth = parsed.filter(entry => typeof entry.width === 'number');

    if (withWidth.length === 0) {
      return null;
    }

    // Sort by width in descending order
    withWidth.sort((a, b) => b.width! - a.width!);

    // Return the URL with the largest width
    return withWidth[0].url;
  }
  static biddyExtractScripts(data: string) {
    const el = document.getElementById('fetched') as HTMLElement;
    el.innerHTML = data;
    const productItems = el.querySelectorAll('.pcc')


    let hits: iSlotItem[] = []

    productItems.forEach((el, i) => {
      const srcset = el.querySelector('img')?.getAttribute("srcset") ?? ''
      const image = `https://www.biddy.ng${(Finder.getLargestImageUrl(srcset) as string)}`
      let href = el?.getAttribute('href') ?? ''
      href = `https://www.biddy.ng${href}`
      const price = Finder.extractNumberFromPrice(el.querySelector('.font-semibold.text-md.text-black')?.textContent ?? '')
      const title = el.querySelector('.ui_itemName__fL8a1')?.textContent ?? ''

      const id = slugify(`${title}-${i}`)
      hits.push({ image, href, price, id })
    })

    el.innerHTML = '';
    return hits;
  };
}

export const finder = Finder.getInstance()