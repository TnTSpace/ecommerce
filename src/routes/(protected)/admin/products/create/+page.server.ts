import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { CategoryCRUD } from '$lib/db/category';
import { ProductCRUD } from '$lib/db/product';
import { handleFileUpload } from '$lib/server/minio';
import { slugify } from '$lib/fxns';
import { db } from '$lib/db/drizzle';
import { productImage } from '$lib/db/schema';

export const load = (async () => {
  const categories = await CategoryCRUD.getAll();
  return {
    categories: categories.data || [],
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const slug = (formData.get('slug') as string) || slugify(name);
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const sku = formData.get('sku') as string;
    const barcode = formData.get('barcode') as string;
    const basePrice = formData.get('basePrice') as string;
    const compareAtPrice = formData.get('compareAtPrice') as string;
    const stockQuantity = parseInt(formData.get('stockQuantity') as string) || 0;
    const lowStockThreshold = parseInt(formData.get('lowStockThreshold') as string) || 10;
    const categoryId = formData.get('categoryId') as string;
    const isActive = formData.get('isActive') === 'on';
    const isFeatured = formData.get('isFeatured') === 'on';
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const images = formData.getAll('images') as File[];

    // Validate required fields
    if (!name || !description || !sku || !basePrice) {
      return fail(400, { error: 'Missing required fields' });
    }

    try {
      // Create product
      const result = await ProductCRUD.create({
        name,
        slug,
        description,
        shortDescription: shortDescription || null,
        sku,
        barcode: barcode || null,
        basePrice,
        compareAtPrice: compareAtPrice || null,
        stockQuantity,
        lowStockThreshold,
        categoryId: categoryId || null,
        isActive,
        isFeatured,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
      });

      if (!result.success || !result.data) {
        return fail(400, { error: result.error || 'Failed to create product' });
      }

      // Upload images
      const validImages = images.filter(img => img.size > 0);
      for (let i = 0; i < validImages.length; i++) {
        const file = validImages[i];
        const uploadResult = await handleFileUpload(file, 'products');

        await db.insert(productImage).values({
          productId: result.data.id,
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
