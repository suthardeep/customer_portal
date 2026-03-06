import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";

export interface CreateReviewRequest {
  productId: string;
  orderId: string;
  title?: string;
  description?: string;
  rating: number;
  mediaUrls: string[];
}

export interface Review {
  reviewId: string;
  productId: string;
  orderId: string;
  productName: string;
  productImage: string;
  title: string;
  description: string;
  rating: number;
  mediaUrls: string[];
  createdAt: string;
}

export type MyReviewsResponse = BaseApiResponse<PaginatedResponse<Review>>;
