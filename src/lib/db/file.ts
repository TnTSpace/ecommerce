import { BaseCRUD, eq, desc, sql, type CRUDResult, type CRUDListResult } from "./crud";
import { file, type File, type NewFile } from "./schema";
import { db } from "./drizzle";

interface FileFilters {
  uploadedBy?: string;
  category?: string;
  mimeType?: string;
}

class FileCRUDClass extends BaseCRUD<typeof file, File, NewFile> {
  constructor() {
    super(file);
  }

  /**
   * Get files with filters
   */
  async getFiltered(
    filters?: FileFilters,
    page = 1,
    limit = 20
  ): Promise<CRUDListResult<File>> {
    try {
      const offset = (page - 1) * limit;
      const conditions: any[] = [];

      if (filters?.uploadedBy) {
        conditions.push(eq(file.uploadedBy, filters.uploadedBy));
      }
      if (filters?.category) {
        conditions.push(eq(file.category, filters.category));
      }
      if (filters?.mimeType) {
        conditions.push(sql`${file.mimeType} LIKE ${filters.mimeType + '%'}`);
      }

      const whereClause = conditions.length > 0 ? sql`${conditions.join(' AND ')}` : undefined;

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(file);

      const total = Number(countResult?.count || 0);

      const results = await db
        .select()
        .from(file)
        .orderBy(desc(file.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: results,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get files" };
    }
  }

  /**
   * Get files by category
   */
  async getByCategory(category: string, page = 1, limit = 20): Promise<CRUDListResult<File>> {
    try {
      const offset = (page - 1) * limit;

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(file)
        .where(eq(file.category, category));

      const total = Number(countResult?.count || 0);

      const results = await db
        .select()
        .from(file)
        .where(eq(file.category, category))
        .orderBy(desc(file.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: results,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get files" };
    }
  }

  /**
   * Get images only
   */
  async getImages(page = 1, limit = 20): Promise<CRUDListResult<File>> {
    try {
      const offset = (page - 1) * limit;

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(file)
        .where(sql`${file.mimeType} LIKE 'image/%'`);

      const total = Number(countResult?.count || 0);

      const results = await db
        .select()
        .from(file)
        .where(sql`${file.mimeType} LIKE 'image/%'`)
        .orderBy(desc(file.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: results,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get images" };
    }
  }

  /**
   * Get storage usage statistics
   */
  async getStorageStats(): Promise<CRUDResult<{
    totalFiles: number;
    totalSize: number;
    byCategory: Record<string, { count: number; size: number }>;
  }>> {
    try {
      const [stats] = await db
        .select({
          totalFiles: sql<number>`count(*)`,
          totalSize: sql<number>`COALESCE(SUM(${file.size}), 0)`,
        })
        .from(file);

      const byCategory = await db
        .select({
          category: file.category,
          count: sql<number>`count(*)`,
          size: sql<number>`COALESCE(SUM(${file.size}), 0)`,
        })
        .from(file)
        .groupBy(file.category);

      const categoryMap: Record<string, { count: number; size: number }> = {};
      byCategory.forEach(c => {
        categoryMap[c.category || 'uncategorized'] = {
          count: Number(c.count),
          size: Number(c.size),
        };
      });

      return {
        success: true,
        data: {
          totalFiles: Number(stats?.totalFiles || 0),
          totalSize: Number(stats?.totalSize || 0),
          byCategory: categoryMap,
        },
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to get storage stats" };
    }
  }
}

export const FileCRUD = new FileCRUDClass();
