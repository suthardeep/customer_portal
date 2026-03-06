import { queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { Review } from "./types/types";
import { reviewKeys } from "./reviewsQueryFactory";
import { getMyReviews } from "./reviewsService";

export const reviewQueries = {
  myReviews: () =>
    queryOptions({
      queryKey: reviewKeys.myReviews(),
      queryFn: async (): Promise<PaginatedResponse<Review>> => {
        const response = await getMyReviews({ data: { pageSize: 50 } });
        return response.data;
      },
    }),
};
