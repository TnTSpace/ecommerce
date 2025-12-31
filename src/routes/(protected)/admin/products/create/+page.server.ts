import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { CategoryCRUD } from '$lib/db/category';
import { ProductCRUD } from '$lib/db/product';
import { TagCRUD } from '$lib/db/tag';
import { SizeCRUD } from '$lib/db/size';
import { handleFileUpload } from '$lib/server/minio';
import { db } from '$lib/db/drizzle';
import { productImage, productTag, productSize } from '$lib/db/schema';

export const load = (async () => {
  const [categories, tags, sizes] = await Promise.all([
    CategoryCRUD.getAll(),
    TagCRUD.getAll(),
    SizeCRUD.getAll(),
  ]);

  return {
    categories: categories.data || [],
    tags: tags.data || [],
    sizes: sizes.data || [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const sku = formData.get('sku') as string;
    const barcode = formData.get('barcode') as string;
    const basePrice = formData.get('basePrice') as string;
    const compareAtPrice = formData.get('compareAtPrice') as string;
    const marketPrice = formData.get('marketPrice') as string;
    const stockQuantity = parseInt(formData.get('stockQuantity') as string) || 0;
    const lowStockThreshold = parseInt(formData.get('lowStockThreshold') as string) || 10;
    const categoryId = formData.get('categoryId') as string;
    const isActive = formData.get('isActive') === 'on' || formData.get('isActive') === 'true';
    const isFeatured = formData.get('isFeatured') === 'on' || formData.get('isFeatured') === 'true';
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const images = formData.getAll('images') as File[];

    // Complex fields
    const tagIds = formData.getAll('tagIds') as string[];
    const featuresJson = formData.get('features') as string;
    const sizesDataJson = formData.get('sizes') as string;

    // Validate required fields
    if (!name || !description || !sku || !basePrice) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      let features = [];
      try {
        if (featuresJson) features = JSON.parse(featuresJson);
      } catch (e) {
        console.error('Failed to parse features JSON', e);
      }

      // Create product
      const result = await ProductCRUD.create({
        name,
        description,
        shortDescription: shortDescription || null,
        sku,
        barcode: barcode || null,
        basePrice,
        compareAtPrice: compareAtPrice || null,
        marketPrice: marketPrice || null,
        stockQuantity,
        lowStockThreshold,
        categoryId: categoryId || null,
        isActive,
        isFeatured,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        features,
      });

      if (!result.success || !result.data) {
        return fail(400, { error: result.error || 'Failed to create product' });
      }

      const productId = result.data.id;

      // Handle tags
      if (tagIds.length > 0) {
        const tagInserts = tagIds.map(tagId => ({
          id: crypto.randomUUID(),
          productId,
          tagId,
        }));
        await db.insert(productTag).values(tagInserts);
      }

      // Handle sizes
      if (sizesDataJson) {
        try {
          const sizesData = JSON.parse(sizesDataJson);
          if (Array.isArray(sizesData) && sizesData.length > 0) {
            const sizeInserts = sizesData.map(s => ({
              id: crypto.randomUUID(),
              productId,
              sizeId: s.sizeId,
              additionalPrice: s.additionalPrice || "0",
              stockQuantity: parseInt(s.stockQuantity) || 0,
              sku: s.sku || null,
              isAvailable: s.isAvailable !== false,
            }));
            await db.insert(productSize).values(sizeInserts);
          }
        } catch (e) {
          console.error('Failed to parse sizes JSON', e);
        }
      }

      // Upload images
      const validImages = images.filter(img => img.size > 0);
      for (let i = 0; i < validImages.length; i++) {
        const file = validImages[i];
        const uploadResult = await handleFileUpload(file, 'products');

        await db.insert(productImage).values({
          id: crypto.randomUUID(),
          productId,
          url: uploadResult.url,
          altText: name,
          sortOrder: i,
          isPrimary: i === 0,
        });
      }

      throw redirect(303, '/admin/products');
    } catch (error) {
      if (error instanceof Response) throw error;
      console.error('Create product error:', error);
      return fail(500, { error: 'Failed to create product' });
    }
  },
};

