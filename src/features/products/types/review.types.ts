import type { BaseApiResponse, PaginationMeta } from "@/types/baseApi.types";

export interface ReviewCustomer {
  name: string;
  profileImageUrl: string | null;
}

export interface ProductReview {
  id: string;
  productId: string;
  orderId: string | null;
  rating: number;
  title: string | null;
  description: string | null;
  mediaUrls: string[] | null;
  isVerified: boolean;
  isVisible: boolean;
  createdAt: string;
  customer: ReviewCustomer;
}

export interface ReviewsMeta extends PaginationMeta {
  ratingDistribution: Record<"1" | "2" | "3" | "4" | "5", number>;
}

export interface ReviewsResponse {
  data: ProductReview[];
  meta: ReviewsMeta;
}

export type ProductReviewsApiResponse = BaseApiResponse<ReviewsResponse>;

export interface ReviewsParams {
  productId: string;
  currentPage?: number;
}
