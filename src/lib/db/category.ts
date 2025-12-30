import { BaseCRUD, eq, asc, sql, type CRUDResult, type CRUDListResult } from "./crud";
import { category, product, type Category, type NewCategory } from "./schema";
import { db } from "./drizzle";

interface CategoryWithChildren extends Category {
  children?: Category[];
  productCount?: number;
}

interface CategoryTree extends Category {
  children: CategoryTree[];
}

class CategoryCRUDClass extends BaseCRUD<typeof category, Category, NewCategory> {
  constructor() {
    super(category);
  }

  /**
   * Get category by id
   */
  async getById(id: string): Promise<CRUDResult<CategoryWithChildren>> {
    try {
      const [result] = await db
        .select()
        .from(category)
        .where(eq(category.id, id))
        .limit(1);

      if (!result) {
        return { success: false, error: "Category not found" };
      }

      // Get children
      const children = await db
        .select()
        .from(category)
        .where(eq(category.parentId, result.id))
        .orderBy(asc(category.sortOrder));

      return {
        success: true,
        data: { ...result, children },
      };
    } catch (error) {
      console.error(`[CategoryCRUD] GetById error:`, error);
      return { success: false, error: error instanceof Error ? error.message : "Failed to get category" };
    }
  }

  /**
   * Get all active categories with product counts
   */
  async getActiveWithCounts(): Promise<CRUDListResult<CategoryWithChildren>> {
    try {
      const categories = await db
        .select()
        .from(category)
        .where(eq(category.isActive, true))
        .orderBy(asc(category.sortOrder));

      // Get product counts
      const productCounts = await db
        .select({
          categoryId: product.categoryId,
          count: sql<number>`count(*)`,
        })
        .from(product)
        .where(eq(product.isActive, true))
        .groupBy(product.categoryId);

      const countMap = new Map(productCounts.map(pc => [pc.categoryId, Number(pc.count)]));

      const categoriesWithCounts = categories.map(cat => ({
        ...cat,
        productCount: countMap.get(cat.id) || 0,
      }));

      return { success: true, data: categoriesWithCounts };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get categories" };
    }
  }

  /**
   * Get root categories (no parent)
   */
  async getRootCategories(): Promise<CRUDListResult<Category>> {
    try {
      const results = await db
        .select()
        .from(category)
        .where(sql`${category.parentId} IS NULL`)
        .orderBy(asc(category.sortOrder));

      return { success: true, data: results };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get root categories" };
    }
  }

  /**
   * Get category tree (hierarchical)
   */
  async getTree(): Promise<CRUDResult<CategoryTree[]>> {
    try {
      const allCategories = await db
        .select()
        .from(category)
        .where(eq(category.isActive, true))
        .orderBy(asc(category.sortOrder));

      const buildTree = (parentId: string | null): CategoryTree[] => {
        return allCategories
          .filter(cat => cat.parentId === parentId)
          .map(cat => ({
            ...cat,
            children: buildTree(cat.id),
          }));
      };

      return { success: true, data: buildTree(null) };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to build category tree" };
    }
  }

  /**
   * Get children of a category
   */
  async getChildren(parentId: string): Promise<CRUDListResult<Category>> {
    try {
      const results = await db
        .select()
        .from(category)
        .where(eq(category.parentId, parentId))
        .orderBy(asc(category.sortOrder));

      return { success: true, data: results };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get children" };
    }
  }

  /**
   * Update sort order for multiple categories
   */
  async updateSortOrder(updates: { id: string; sortOrder: number }[]): Promise<CRUDResult<boolean>> {
    try {
      await Promise.all(
        updates.map(({ id, sortOrder }) =>
          db.update(category).set({ sortOrder }).where(eq(category.id, id))
        )
      );
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to update sort order" };
    }
  }
}

export const CategoryCRUD = new CategoryCRUDClass();
