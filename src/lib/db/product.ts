import { BaseCRUD, eq, and, like, desc, asc, sql, type CRUDResult, type CRUDListResult } from "./crud";
import { product, productImage, productSize, productTag, category, tag, size, type Product, type NewProduct, type ProductImage, type ProductSize } from "./schema";
import { db } from "./drizzle";

interface ProductWithRelations extends Product {
  category?: typeof category.$inferSelect | null;
  images?: ProductImage[];
  sizes?: (ProductSize & { size?: typeof size.$inferSelect })[];
  tags?: { tag: typeof tag.$inferSelect }[];
  averageRating?: number;
  reviewCount?: number;
}

interface ProductFilters {
  categoryId?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  search?: string;
  tags?: string[];
  inStock?: boolean;
}

interface ProductSortOptions {
  field: 'name' | 'basePrice' | 'createdAt' | 'stockQuantity';
  direction: 'asc' | 'desc';
}

class ProductCRUDClass extends BaseCRUD<typeof product, Product, NewProduct> {
  constructor() {
    super(product);
  }

  /**
   * Get product by ID with all relations
   */
  async getById(id: string): Promise<CRUDResult<ProductWithRelations>> {
    try {
      const [result] = await db
        .select()
        .from(product)
        .where(eq(product.id, id))
        .limit(1);

      if (!result) {
        return { success: false, error: "Product not found" };
      }

      // Get related data
      const [images, sizes, tags, categoryData] = await Promise.all([
        db.select().from(productImage).where(eq(productImage.productId, result.id)).orderBy(asc(productImage.sortOrder)),
        db.select().from(productSize).where(eq(productSize.productId, result.id)),
        db.select().from(productTag).where(eq(productTag.productId, result.id)),
        result.categoryId ? db.select().from(category).where(eq(category.id, result.categoryId)).limit(1) : Promise.resolve([]),
      ]);

      return {
        success: true,
        data: {
          ...result,
          category: categoryData[0] || null,
          images,
          sizes,
          tags: tags as any,
        },
      };
    } catch (error) {
      console.error(`[ProductCRUD] GetById error:`, error);
      return { success: false, error: error instanceof Error ? error.message : "Failed to get product" };
    }
  }


  /**
   * Get products with filters, sorting, and pagination
   */
  async getFiltered(
    filters?: ProductFilters,
    sort?: ProductSortOptions,
    page = 1,
    limit = 20
  ): Promise<CRUDListResult<ProductWithRelations>> {
    try {
      const offset = (page - 1) * limit;
      const conditions: any[] = [];

      if (filters?.isActive !== undefined) {
        conditions.push(eq(product.isActive, filters.isActive));
      }
      if (filters?.isFeatured !== undefined) {
        conditions.push(eq(product.isFeatured, filters.isFeatured));
      }
      if (filters?.categoryId) {
        conditions.push(eq(product.categoryId, filters.categoryId));
      }
      if (filters?.search) {
        conditions.push(like(product.name, `%${filters.search}%`));
      }
      if (filters?.minPrice !== undefined) {
        conditions.push(sql`${product.basePrice} >= ${filters.minPrice}`);
      }
      if (filters?.maxPrice !== undefined) {
        conditions.push(sql`${product.basePrice} <= ${filters.maxPrice}`);
      }
      if (filters?.inStock) {
        conditions.push(sql`${product.stockQuantity} > 0`);
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Count total
      const countQuery = db.select({ count: sql<number>`count(*)` }).from(product);
      if (whereClause) countQuery.where(whereClause);
      const [countResult] = await countQuery;
      const total = Number(countResult?.count || 0);

      // Get products
      let query = db.select().from(product);
      if (whereClause) query.where(whereClause);

      // Apply sorting
      if (sort) {
        const sortFn = sort.direction === 'asc' ? asc : desc;
        query.orderBy(sortFn(product[sort.field]));
      } else {
        query.orderBy(desc(product.createdAt));
      }

      const results = await query.limit(limit).offset(offset);

      // Get images for all products
      const productIds = results.map(p => p.id);
      const allImages = productIds.length > 0
        ? await db.select().from(productImage).where(sql`${productImage.productId} IN ${productIds}`)
        : [];

      // Map images to products
      const productsWithImages = results.map(p => ({
        ...p,
        images: allImages.filter(img => img.productId === p.id),
      }));

      return {
        success: true,
        data: productsWithImages,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error(`[ProductCRUD] GetFiltered error:`, error);
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get products" };
    }
  }

  /**
   * Get featured products
   */
  async getFeatured(limit = 12): Promise<CRUDListResult<ProductWithRelations>> {
    return this.getFiltered({ isActive: true, isFeatured: true }, undefined, 1, limit);
  }

  /**
   * Get products by category id
   */
  async getByCategory(categoryId: string, page = 1, limit = 20): Promise<CRUDListResult<ProductWithRelations>> {
    return this.getFiltered({ categoryId, isActive: true }, undefined, page, limit);
  }

  /**
   * Search products
   */
  async search(query: string, page = 1, limit = 20): Promise<CRUDListResult<ProductWithRelations>> {
    return this.getFiltered({ search: query, isActive: true }, undefined, page, limit);
  }

  /**
   * Add image to product
   */
  async addImage(productId: string, imageData: Omit<typeof productImage.$inferInsert, 'productId'>): Promise<CRUDResult<ProductImage>> {
    try {
      const [result] = await db.insert(productImage).values({ ...imageData, productId }).returning();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to add image" };
    }
  }

  /**
   * Remove image from product
   */
  async removeImage(imageId: string): Promise<CRUDResult<ProductImage>> {
    try {
      const [result] = await db.delete(productImage).where(eq(productImage.id, imageId)).returning();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to remove image" };
    }
  }

  /**
   * Update stock quantity
   */
  async updateStock(productId: string, quantity: number): Promise<CRUDResult<Product>> {
    return this.update(productId, { stockQuantity: quantity });
  }

  /**
   * Get low stock products
   */
  async getLowStock(): Promise<CRUDListResult<Product>> {
    try {
      const results = await db
        .select()
        .from(product)
        .where(sql`${product.stockQuantity} <= ${product.lowStockThreshold}`)
        .orderBy(asc(product.stockQuantity));

      return { success: true, data: results };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get low stock products" };
    }
  }
}

export const ProductCRUD = new ProductCRUDClass();
