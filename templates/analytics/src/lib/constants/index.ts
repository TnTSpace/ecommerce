import Jiji from "$lib/components/icons/competitors/Jiji.svelte";
import Konga from "$lib/components/icons/competitors/Konga.svelte";
import Temu from "$lib/components/icons/competitors/Temu.svelte";
import Biddy from "$lib/components/icons/competitors/Biddy.svelte"
import type { iCompetition, iGenericCompetitor, iSKU, TCompetitor, TCountryCode } from "$lib/interface";
import { Finder } from "$lib/hooks/finder.svelte";
import Slot from "$lib/components/icons/competitors/Slot.svelte";
import MomoMarket from "$lib/components/icons/competitors/MomoMarket.svelte";
import Kilimall from "$lib/components/icons/competitors/Kilimall.svelte";
import Babiken from "$lib/components/icons/competitors/Babiken.svelte";
import Djok from "$lib/components/icons/competitors/Djok.svelte";
import Amazon from "$lib/components/icons/competitors/Amazon.svelte";
import BTech from "$lib/components/icons/competitors/Btech.svelte";
import TwoB from "$lib/components/icons/competitors/TwoB.svelte";
import Carrefour from "$lib/components/icons/competitors/Carrefour.svelte";
import Abanista from "$lib/components/icons/competitors/Abanista.svelte";
import Dombelo from "$lib/components/icons/competitors/Dombelo.svelte";
import { MaList, NgList } from "../../assets";
import Tonaton from "$lib/components/icons/competitors/Tonaton.svelte";
import Decathlon from "$lib/components/icons/competitors/Decathlon.svelte";
import Iris from "$lib/components/icons/competitors/Iris.svelte";
import Ultrapc from "$lib/components/icons/competitors/Ultrapc.svelte";
import Diardzair from "$lib/components/icons/competitors/Diardzair.svelte";
import Footland from "$lib/components/icons/competitors/Footland.svelte";
import Soumari from "$lib/components/icons/competitors/Soumari.svelte";
import Noon from "$lib/components/icons/competitors/Noon.svelte";
import MarjaneMall from "$lib/components/icons/competitors/MarjaneMall.svelte";
import Shein from "$lib/components/icons/competitors/Shein.svelte";
import Electroplanet from "$lib/components/icons/competitors/Electroplanet.svelte";

export enum Role {
  ADMIN = 'admin',
  CHILD = 'child',
  TEACHER = 'teacher',
  PARENT = 'parent',
  GUEST = 'guest'
}

export enum Constants {
  SKUSTORE = 'skuStore',
  GEMINI_API_KEY_LINK = 'https://aistudio.google.com/apikey',
  FIRECRAWL_EXTRACT='https://api.firecrawl.dev/v1/extract'
}

export enum DisplayType {
  GRID = 'grid',
  LIST = 'list'
}

export const footerExclusionList = [
  '/blogs/*',
  '/courses/*',
  '/campaigns/*',
  '/services/*',
  '/partners/*'
];

export function isExcludedFromFooter(path: string): boolean {
  return footerExclusionList.some((pattern) => {
    if (pattern.endsWith('/*')) {
      const basePath = pattern.slice(0, -2); // Remove /* from the end
      return path.startsWith(basePath);
    }
    return path === pattern;
  });
}


export enum FindByEnum {
  SKU = 'sku',
  URL = 'url'
}

export enum Competitors {
  TEMU = 'temu',
  JIJI = 'jiji',
  KONGA = 'konga',
  BIDDY = 'biddy',
  SLOT = 'slot',
  MOMOMARKET = 'momomarket',
  KILIMALL = 'kilimall',
  BABIKEN = 'babiken',
  DJOK = 'djok',
  AMAZON = 'amazon',
  BTECH = 'btech',
  TWOB = 'twob',
  CARREFOUR = 'carrefour',
  ABANISTA = 'abanista',
  DOMBELO = 'dombelo',
  TONATON = 'tonaton',
  DECATHLON = 'decathlon',
  IRIS = 'iris',
  ULTRAPC = 'ultrapc',
  DIARDZAIR = 'diardzair',
  FOOTLAND = 'footland',
  SOUMARI = 'soumari',
  NOON = 'noon',
  MARJANEMALL = 'marjanemall',
  SHEIN = 'shein',
  ELECTROPLANET='electroplanet'
}

export const competitorLogo: Record<TCompetitor, any> = {
  temu: Temu,
  konga: Konga,
  jiji: Jiji,
  biddy: Biddy,
  slot: Slot,
  momomarket: MomoMarket,
  kilimall: Kilimall,
  babiken: Babiken,
  djok: Djok,
  amazon: Amazon,
  btech: BTech,
  twob: TwoB,
  carrefour: Carrefour,
  abanista: Abanista,
  dombelo: Dombelo,
  tonaton: Tonaton,
  decathlon: Decathlon,
  iris: Iris,
  ultrapc: Ultrapc,
  diardzair: Diardzair,
  footland: Footland,
  soumari: Soumari,
  noon: Noon,
  marjanemall: MarjaneMall,
  shein: Shein,
  electroplanet: Electroplanet
}

export let competitors: Record<string, string[]> = {
  nigeria: ['temu', 'jiji', 'konga', 'slot', 'alaba'],
  ivory_coast: ['babiken', 'oplayce', 'kobo', 'djok', 'market by momo'],
  algeria: ['decathlon', 'temu', 'homecenter', 'destock dz', 'ouedkniss'],
  egypt:['amazon', 'btech', 'twob', 'noon', 'carrefour', ],
  ghana: ['jiji', 'tonaton', 'kikuu', 'melcom'],
  kenya: ['kilimall', 'carrefour', 'naivas', 'baki beauty', 'my dawa'],
  morocco: ['marjane mall', 'temu', 'shein', 'electroplanet','lc waikiki', 'ikea', 'decathlon', 'cote para', 'hmizate', 'kitea', 'kiabi', 'parfois', 'lefties', 'wlidaty', 'monjouet', 'alpha 55', 'virgin', 'mavie', 'electrobousfiha', 'universparadiscount', 'mrbricolage', 'biougnach'],
  senegal: ['soumari', 'univers cosmetix', 'auchan', 'fabellashop',],
  uganda: ['jiji', 'momomarket', 'abanista', 'dombelo', 'kikubo', 'kikuu']
}

export const rCompetitors: Record<TCompetitor, iCompetition> = {
  temu: {
    name: Competitors.TEMU,
    logo: Temu,
  },
  konga: {
    name: Competitors.KONGA,
    logo: Konga,
  },
  jiji: {
    name: Competitors.JIJI,
    logo: Jiji,
  },
  biddy: {
    name: Competitors.BIDDY,
    logo: Biddy,
  },
  slot: {
    name: Competitors.SLOT,
    logo: Slot,
  },
  momomarket: {
    name: Competitors.MOMOMARKET,
    logo: MomoMarket,
  },
  kilimall: {
    name: Competitors.KILIMALL,
    logo: Kilimall
  },
  babiken: {
    name: Competitors.BABIKEN,
    logo: Babiken
  },
  djok: {
    name: Competitors.DJOK,
    logo: Djok
  },
  amazon: {
    name: Competitors.AMAZON,
    logo: Amazon
  },
  btech: {
    name: Competitors.BTECH,
    logo: BTech
  },
  twob: {
    name: Competitors.TWOB,
    logo: TwoB
  },
  carrefour: {
    name: Competitors.CARREFOUR,
    logo: Carrefour
  },
  abanista: {
    name: Competitors.ABANISTA,
    logo: Abanista
  },
  dombelo: {
    name: Competitors.DOMBELO,
    logo: Dombelo
  },
  tonaton: {
    name: Competitors.TONATON,
    logo: Tonaton
  },
  decathlon: {
    name: Competitors.DECATHLON,
    logo: Decathlon
  },
  iris: {
    name: Competitors.IRIS,
    logo: Iris
  },
  ultrapc: {
    name: Competitors.ULTRAPC,
    logo: Ultrapc
  },
  diardzair: {
    name: Competitors.DIARDZAIR,
    logo: Diardzair
  },
  footland: {
    name: Competitors.FOOTLAND,
    logo: Footland
  },
  soumari: {
    name: Competitors.SOUMARI,
    logo: Soumari
  },
  noon: {
    name: Competitors.NOON,
    logo: Noon
  },
  marjanemall: {
    name: Competitors.MARJANEMALL,
    logo: MarjaneMall
  },
  shein: {
    name: Competitors.SHEIN,
    logo: Shein
  },
  electroplanet: {
    name: Competitors.ELECTROPLANET,
    logo: Shein
  },
}

export const competitorNames = Object.keys(rCompetitors)

export enum CompetitorMetadata {
  KONGA = 'json.props.initialProps.pageProps.resultsState.content.hits',
  KONGA_IMAGE = 'https://www-konga-com-res.cloudinary.com/w_400,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product',
  KONGA_PDP = 'https://www.konga.com/product',
  JIJI_NG_PDP = 'https://jiji.ng'
}

interface iCompetitorFxns {
  getUrl: (product: iSKU) => string;
  extractHits: (product: iSKU, data: string) => any[]
  thresh: (data: any, name: string) => any[];
}

export const CountryCompetitors: Record<TCountryCode, Record<string, iCompetitorFxns>> = {
  ng: {
    // temu: {
    //   getUrl: (product: iSKU) => {
    //     return product?.name
    //   },
    //   extractHits: (product: iSKU, searchTerm: string) => {
    //     // const searchWords = searchTerm
    //     //   .toLowerCase()
    //     //   .split(/\s+/) // split by any whitespace
    //     //   .filter(word => word); // remove empty strings

    //     // const matches = NgList.filter(product => {
    //     //   const titleLower = product.title.toLowerCase();
    //     //   return searchWords.every(word => titleLower.includes(word));
    //     // });

    //     const matches = Finder.searchProducts(NgList, searchTerm)

    //     return matches.map(match => {
    //       const price = String(match.price).replace(",", "")
    //       const href = `https://www.temu.com/${match.href}`
    //       return { ...match, price, href }
    //     })
    //   }
    // },
    // jiji: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://jiji.ng/search';
    //     // const search = `https://jiji.ng/api_web/v1/listing`
    //     const url = new URL(search);
    //     url.searchParams.set('query', `${product?.name.toLowerCase()}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     const obj = JSON.parse(data)?.adverts_list?.adverts ?? [];
    //     const mapped: iGenericCompetitor[] = obj.map((item: any) => ({
    //       id: `jiji-${item.id}`,
    //       image: item.image_obj.url,
    //       href: `${CompetitorMetadata.JIJI_NG_PDP}${item.url}`,
    //       price: item.price_obj.value,
    //       title: item.title
    //     }))

    //     const matches = Finder.searchProducts(mapped, name)
    //     return matches
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.jijiExtractScripts(data)
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
    // biddy: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://www.biddy.ng/search';
    //     const url = new URL(search);
    //     url.searchParams.set('q', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.biddyExtractScripts(data)
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
    konga: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.konga.com/search';
        const url = new URL(search);
        url.searchParams.set('search', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.kongaExtractScripts(data);
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );
        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    // slot: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://slot.ng/index.php/catalogsearch/result';
    //     const url = new URL(search);
    //     url.searchParams.set('q', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.slotExtractScripts(data);
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
  },
  ci: {
    babiken: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.babiken.net/search';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        return url.href
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.babikenExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      },
      thresh: (data: any, name: string) => {
        return []
      },
    },
    djok: {
      getUrl: (product: iSKU) => {
        const search = 'https://djokstore.ci/search';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.djokExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    jiji: {
      getUrl: (product: iSKU) => {
        const search = `https://jiji.co.ci/api_web/v1/listing`
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name.toLowerCase()}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.jijiExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  },
  dz: {

    decathlon: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.decathlon.com.dz/search';
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.decathlonExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    diardzair: {
      getUrl: (product: iSKU) => {
        const search = 'https://new.diardzair.com.dz/search';
        const url = new URL(search);
        url.searchParams.set('key', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.ultrapcExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    footland: {
      getUrl: (product: iSKU) => {
        const search = 'https://footland.dz/';
        const url = new URL(search);
        url.searchParams.set('s', `${product?.name}`);
        url.searchParams.set('post_type', 'product');
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.footlandExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  },
  eg: {
    amazon: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.amazon.eg/s';
        const url = new URL(search);
        url.searchParams.set('k', `${product?.name}`);
        url.searchParams.set('language', 'en_AE')
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.amazonExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    // btech: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://btech.com/en/catalogsearch/result';
    //     const url = new URL(search);
    //     url.searchParams.set('q', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.btechExtractScripts(data)
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
    // twob: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://2b.com.eg/en/catalogsearch/result';
    //     const url = new URL(search);
    //     url.searchParams.set('q', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.twobExtractScripts(data)
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
    noon: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.noon.com/egypt-en/search';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.noonExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    // carrefour: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://www.carrefouregypt.com/mafegy/en/v4/search';
    //     const url = new URL(search);
    //     url.searchParams.set('keyword', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.twobExtractScripts(data)
    //     // const filtered = hits.filter(
    //     //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
    //     // );

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // },
  },
  gh: {
    jiji: {
      getUrl: (product: iSKU) => {
        const search = `https://jiji.com.gh/api_web/v1/listing`
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name.toLowerCase()}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.jijiExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    tonaton: {
      getUrl: (product: iSKU) => {
        const search = 'https://tonaton.com/search';
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name.toLowerCase()}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.tonatonExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  },
  ke: {
    jiji: {
      getUrl: (product: iSKU) => {
        const search = `https://jiji.co.ke/api_web/v1/listing`
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name.toLowerCase()}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.jijiExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    kilimall: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.kilimall.co.ke/search';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.kilimallExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    carrefour: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.carrefour.ke/mafken/en/v4/search';
        const url = new URL(search);
        url.searchParams.set('keyword', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.twobExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  },
  ma: {
    marjanemall: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.marjanemall.ma/catalogsearch/result';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        url.searchParams.set('page', '1');
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.marjanemallExtractScripts(data)

        return hits
        // const matches = Finder.searchProducts(hits, product?.name)
        // return matches
      }
    },
    
    // decathlon: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://www.decathlon.ma/search/';
    //     const url = new URL(search);
    //     url.searchParams.set('query', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.marjanemallExtractScripts(data)

    //     // return hits
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     console.log({ hits, matches })
    //     return hits
    //   }
    // },
    // electroplanet: {
    //   getUrl: (product: iSKU) => {
    //     const search = 'https://www.electroplanet.ma/recherche';
    //     const url = new URL(search);
    //     url.searchParams.set('q', `${product?.name}`);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.marjanemallExtractScripts(data)

    //     // return hits
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     console.log({ hits, matches })
    //     return hits
    //   }
    // },
    // shein: {
    //   getUrl: (product: iSKU) => {
    //     const search = `https://ma.shein.com/pdsearch/${product?.name.toLowerCase()}`
    //     const url = new URL(search);
    //     return url.href
    //   },
    //   thresh: (data: any, name: string) => {
    //     return []
    //   },
    //   extractHits: (product: iSKU, data: string) => {
    //     const hits = Finder.marjanemallExtractScripts(data)

    //     // return filtered
    //     const matches = Finder.searchProducts(hits, product?.name)
    //     return matches
    //   }
    // }
  },
  sn: {

    soumari: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.soumari.com/';
        const url = new URL(search);
        url.searchParams.set('s', `${product?.name}`);
        url.searchParams.set('post_type', 'product')
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.irisExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  },
  ug: {
    jiji: {
      getUrl: (product: iSKU) => {
        const search = `https://jiji.ug/api_web/v1/listing`
        const url = new URL(search);
        url.searchParams.set('query', `${product?.name.toLowerCase()}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.jijiExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    momomarket: {
      getUrl: (product: iSKU) => {
        const search = 'https://market.momo.africa/Portal/search';
        const url = new URL(search);
        url.searchParams.set('q', `${product?.name}`);
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.momomarketExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    abanista: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.abanista.com';
        const url = new URL(search);
        url.searchParams.set('s', `${product?.name}`);
        url.searchParams.set('post_type', 'product')
        url.searchParams.set('dgwt_wcas', '1')
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.abanistaExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
    dombelo: {
      getUrl: (product: iSKU) => {
        const search = 'https://www.dombelo.com';
        const url = new URL(search);
        url.searchParams.set('s', `${product?.name}`);
        url.searchParams.set('post_type', 'product')
        return url.href
      },
      thresh: (data: any, name: string) => {
        return []
      },
      extractHits: (product: iSKU, data: string) => {
        const hits = Finder.dombeloExtractScripts(data)
        // const filtered = hits.filter(
        //   (prd) => prd.title.toLowerCase().indexOf(product.brand.toLowerCase()) !== -1
        // );

        // return filtered
        const matches = Finder.searchProducts(hits, product?.name)
        return matches
      }
    },
  }
}


export const sortOptions = [
  {
    label: 'Sort by:',
    value: ''
  },
  {
    label: 'Price: Low to High',
    value: 'Price: Low to High'
  },
  {
    label: 'Price: High to Low',
    value: 'Price: High to Low'
  },
  {
    label: 'Product Rating',
    value: 'Product Rating'
  }
];