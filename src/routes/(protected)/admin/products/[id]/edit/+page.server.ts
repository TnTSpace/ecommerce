import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { ProductCRUD } from '$lib/db/product';
import { TagCRUD } from '$lib/db/tag';
import { SizeCRUD } from '$lib/db/size';
import { CategoryCRUD } from '$lib/db/category';
import { handleFileUpload } from '$lib/server/minio';
import { db } from '$lib/db/drizzle';
import { productImage, productTag, productSize, eq } from '$lib/db/schema';

export const load = (async ({ params }) => {
  const [productResult, categories, tags, sizes] = await Promise.all([
    ProductCRUD.getById(params.id),
    CategoryCRUD.getAll(),
    TagCRUD.getAll(),
    SizeCRUD.getAll(),
  ]);

  if (!productResult.success || !productResult.data) {
    throw redirect(303, '/admin/products');
  }

  return {
    product: productResult.data,
    categories: categories.data || [],
    tags: tags.data || [],
    sizes: sizes.data || [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ params, request }) => {
    const formData = await request.formData();
    const productId = params.id;

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

      // Update product
      const result = await ProductCRUD.update(productId, {
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
        updatedAt: new Date(),
      });

      if (!result.success) {
        return fail(400, { error: result.error || 'Failed to update product' });
      }

      // Sync tags
      await db.delete(productTag).where(eq(productTag.productId, productId));
      if (tagIds.length > 0) {
        const tagInserts = tagIds.map(tagId => ({
          id: crypto.randomUUID(),
          productId,
          tagId,
        }));
        await db.insert(productTag).values(tagInserts);
      }

      // Sync sizes
      await db.delete(productSize).where(eq(productSize.productId, productId));
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

      // Handle new images
      const validImages = images.filter(img => img.size > 0);
      if (validImages.length > 0) {
        // Get current max sort order
        const currentImages = await db.select().from(productImage).where(eq(productImage.productId, productId));
        let maxSortOrder = currentImages.reduce((max, img) => Math.max(max, img.sortOrder), -1);

        for (let i = 0; i < validImages.length; i++) {
          const file = validImages[i];
          const uploadResult = await handleFileUpload(file, 'products');

          await db.insert(productImage).values({
            id: crypto.randomUUID(),
            productId,
            url: uploadResult.url,
            altText: name,
            sortOrder: ++maxSortOrder,
            isPrimary: maxSortOrder === 0,
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Update product error:', error);
      return fail(500, { error: 'Failed to update product' });
    }
  },
};
