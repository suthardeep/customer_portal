import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { FeedPost } from "./feed.types";

export interface BookmarkedPostsParams {
  page?: number;
}

export type BookmarkedPostsResponse = BaseApiResponse<PaginatedResponse<FeedPost>>;
