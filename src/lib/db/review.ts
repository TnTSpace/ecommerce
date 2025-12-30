import { BaseCRUD, eq, and, desc, asc, sql, type CRUDResult, type CRUDListResult } from "./crud";
import { review, product, user, order, type Review, type NewReview } from "./schema";
import { db } from "./drizzle";

interface ReviewWithUser extends Review {
  user?: { id: string; name: string; image?: string | null };
}

interface ReviewFilters {
  productId?: string;
  userId?: string;
  isApproved?: boolean;
  rating?: number;
  minRating?: number;
}

class ReviewCRUDClass extends BaseCRUD<typeof review, Review, NewReview> {
  constructor() {
    super(review);
  }

  /**
   * Get reviews for a product
   */
  async getByProduct(
    productId: string,
    approvedOnly = true,
    page = 1,
    limit = 10
  ): Promise<CRUDListResult<ReviewWithUser>> {
    try {
      const offset = (page - 1) * limit;
      const conditions = [eq(review.productId, productId)];

      if (approvedOnly) {
        conditions.push(eq(review.isApproved, true));
      }

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(review)
        .where(and(...conditions));

      const total = Number(countResult?.count || 0);

      const reviews = await db
        .select()
        .from(review)
        .where(and(...conditions))
        .orderBy(desc(review.createdAt))
        .limit(limit)
        .offset(offset);

      // Get user details
      const userIds = [...new Set(reviews.map(r => r.userId))];
      const users = userIds.length > 0
        ? await db.select({ id: user.id, name: user.name, image: user.image }).from(user).where(sql`${user.id} IN ${userIds}`)
        : [];

      const userMap = new Map(users.map(u => [u.id, u]));

      const reviewsWithUsers = reviews.map(r => ({
        ...r,
        user: userMap.get(r.userId),
      }));

      return {
        success: true,
        data: reviewsWithUsers,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get reviews" };
    }
  }

  /**
   * Get product rating statistics
   */
  async getProductStats(productId: string): Promise<CRUDResult<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<number, number>;
  }>> {
    try {
      const [stats] = await db
        .select({
          averageRating: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
          totalReviews: sql<number>`count(*)`,
        })
        .from(review)
        .where(and(eq(review.productId, productId), eq(review.isApproved, true)));

      // Get rating distribution
      const distribution = await db
        .select({
          rating: review.rating,
          count: sql<number>`count(*)`,
        })
        .from(review)
        .where(and(eq(review.productId, productId), eq(review.isApproved, true)))
        .groupBy(review.rating);

      const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      distribution.forEach(d => {
        ratingDistribution[d.rating] = Number(d.count);
      });

      return {
        success: true,
        data: {
          averageRating: Number(stats?.averageRating || 0),
          totalReviews: Number(stats?.totalReviews || 0),
          ratingDistribution,
        },
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to get stats" };
    }
  }

  /**
   * Create review with verified purchase check
   */
  async createWithVerification(
    data: NewReview,
    orderId?: string
  ): Promise<CRUDResult<Review>> {
    try {
      let isVerifiedPurchase = false;

      // Check if user has purchased this product
      if (orderId) {
        const [orderRecord] = await db
          .select()
          .from(order)
          .where(and(eq(order.id, orderId), eq(order.userId, data.userId)))
          .limit(1);

        isVerifiedPurchase = !!orderRecord && orderRecord.paymentStatus === 'paid';
      }

      const [result] = await db
        .insert(review)
        .values({ ...data, isVerifiedPurchase, orderId })
        .returning();

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to create review" };
    }
  }

  /**
   * Approve review
   */
  async approve(reviewId: string): Promise<CRUDResult<Review>> {
    return this.update(reviewId, { isApproved: true } as any);
  }

  /**
   * Reject/unapprove review
   */
  async reject(reviewId: string): Promise<CRUDResult<Review>> {
    return this.update(reviewId, { isApproved: false } as any);
  }

  /**
   * Get pending reviews for moderation
   */
  async getPending(page = 1, limit = 20): Promise<CRUDListResult<ReviewWithUser>> {
    try {
      const offset = (page - 1) * limit;

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(review)
        .where(eq(review.isApproved, false));

      const total = Number(countResult?.count || 0);

      const reviews = await db
        .select()
        .from(review)
        .where(eq(review.isApproved, false))
        .orderBy(asc(review.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: reviews,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      return { success: false, data: [], error: error instanceof Error ? error.message : "Failed to get pending reviews" };
    }
  }

  /**
   * Increment helpful count
   */
  async markHelpful(reviewId: string): Promise<CRUDResult<Review>> {
    try {
      const [result] = await db
        .update(review)
        .set({ helpfulCount: sql`${review.helpfulCount} + 1` })
        .where(eq(review.id, reviewId))
        .returning();

      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Failed to mark helpful" };
    }
  }

  /**
   * List all reviews with product and user details
   */
  async list(params: { page?: number; limit?: number; search?: string }) {
    try {
      const page = params.page || 1;
      const limit = params.limit || 10;
      const offset = (page - 1) * limit;

      const [countResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(review);
      const total = Number(countResult?.count || 0);

      const reviews = await db
        .select({
          review: review,
          productName: product.name,
          userName: user.name,
        })
        .from(review)
        .leftJoin(product, eq(review.productId, product.id))
        .leftJoin(user, eq(review.userId, user.id))
        .orderBy(desc(review.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        success: true,
        data: reviews,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasMore: page < Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("[ReviewCRUD] list error:", error);
      return { success: false, data: [], error: "Failed to list reviews" };
    }
  }
}

export const ReviewCRUD = new ReviewCRUDClass();
