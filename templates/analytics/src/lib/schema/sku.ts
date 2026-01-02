import { z } from 'zod'

export const skuSchema = z.object({
  sku: z.string(),
  name: z.string(),
  displayName: z.string(),
  brand: z.string(),
  sellerId: z.number(),
  isShopExpress: z.boolean().optional(),
  categories: z.array(z.string()),
  prices: z.object({
    discount: z.string().optional(),
    oldPrice: z.string().optional(),
    oldPriceEuro: z.string(),
    price: z.string(),
    priceEuro: z.string(),
    rawPrice: z.string(),
    taxEuro: z.string()
  }),
  tags: z.string(),
  rating: z.object({
    average: z.number(),
    totalRatings: z.number()
  }).optional(),
  image: z.string(),
  url: z.string(),
  badges: z.object({
    campaign: z.object({
      name: z.string(),
      identifier: z.string(),
      image: z.string(),
      url: z.string(),
      bgColor: z.string(),
      txtColor: z.string()
    }),
    main: z.object({
      name: z.string(),
      identifier: z.string(),
      url: z.string()
    })
  }).optional(),
  isBuyable: z.boolean(),
  shopExpress: z.object({
    title: z.string()
  }).optional(),
  shopGlobal: z.object({
    identifier: z.string(),
    name: z.string()
  }).optional(),
  simples: z.array(
    z.object({
      sku: z.string(),
      loginUrl: z.string(),
      isBuyable: z.boolean(),
      name: z.string(),
      prices: z.object({
        discount: z.string().optional(),
        oldPrice: z.string().optional(),
        oldPriceEuro: z.string(),
        price: z.string(),
        priceEuro: z.string(),
        rawPrice: z.string(),
        taxEuro: z.string()
      })
    })
  ).optional(),
  selectedVariation: z.string().optional(),
  variationSelection: z.boolean().optional()
})