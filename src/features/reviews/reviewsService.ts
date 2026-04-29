import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { CreateReviewRequest, ProductReviewsParams, Review, ReviewStats, UpdateReviewRequest } from "./types/types";

export const createReview = createServerFn({ method: "POST" })
  .inputValidator((data: CreateReviewRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    return apiRequest("/v1/reviews", {
      method: "POST",
      body: data,
      token,
    });
  });

export const updateReview = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateReviewRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const { id, ...body } = data;
    const token = getToken();
    return apiRequest(`/v1/reviews/${id}`, {
      method: "PATCH",
      body,
      token,
    });
  });

export const getMyReviews = createServerFn({ method: "GET" })
  .inputValidator((data: PaginationQueryParams) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<Review>>> => {
      const token = getToken();
      return apiRequest("/v1/reviews/my-reviews", {
        params: data,
        token,
      });
    },
  );

export const getProductReviewStats = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: productId }): Promise<BaseApiResponse<ReviewStats>> => {
    return apiRequest(`/v1/products/public/${productId}/reviews/stats`);
  });

export const getProductReviews = createServerFn({ method: "GET" })
  .inputValidator((data: ProductReviewsParams) => data)
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<Review>>> => {
      const { productId, ...params } = data;
      return apiRequest(`/v1/products/public/${productId}/reviews`, { params });
    },
  );
