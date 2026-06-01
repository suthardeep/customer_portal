import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import { Product } from "../products/types";

export const getRecentlyViewedProducts = createServerFn({
  method: "GET",
}).handler(async (): Promise<BaseApiResponse<PaginatedResponse<Product>>> => {
  const token = getToken();
  return apiRequest("/v1/user-activity/recent-views", { token });
});
