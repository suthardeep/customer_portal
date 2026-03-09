import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { ProductReviewsParams, Review, ReviewStats } from "./types/types";
import { reviewKeys } from "./reviewsQueryFactory";
import { getMyReviews, getProductReviews, getProductReviewStats } from "./reviewsService";

export const reviewQueries = {
  myReviews: () =>
    queryOptions({
      queryKey: reviewKeys.myReviews(),
      queryFn: async (): Promise<PaginatedResponse<Review>> => {
        const response = await getMyReviews({ data: { pageSize: 50 } });
        return response.data;
      },
    }),

  productReviewStats: (productId: string) =>
    queryOptions({
      queryKey: reviewKeys.productReviewStats(productId),
      queryFn: async (): Promise<ReviewStats> => {
        const response = await getProductReviewStats({ data: productId });
        return response.data;
      },
    }),

  productReviews: (params: ProductReviewsParams) =>
    queryOptions({
      queryKey: reviewKeys.productReviews(params.productId, {
        currentPage: params.currentPage,
        pageSize: params.pageSize,
      }),
      queryFn: async (): Promise<PaginatedResponse<Review>> => {
        const response = await getProductReviews({ data: params });
        return response.data;
      },
    }),

  productReviewsInfinite: (productId: string, pageSize = 10) =>
    infiniteQueryOptions({
      queryKey: reviewKeys.productReviewsInfinite(productId),
      queryFn: async ({ pageParam }) => {
        const response = await getProductReviews({
          data: { productId, currentPage: pageParam, pageSize },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),
};
