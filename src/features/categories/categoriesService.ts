import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { PaginationQueryParams } from "@/types/general.types";
import type { CategoryTreeResponse, CategoryDetailResponse } from "./types/types";

export const getCategoriesTree = createServerFn({ method: "GET" })
  .inputValidator((data?: PaginationQueryParams) => data)
  .handler(async ({ data }): Promise<CategoryTreeResponse> => {
    return apiRequest<CategoryTreeResponse>("/v1/categories/public/tree", {
      params: data,
    });
  });

export const getCategoryById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CategoryDetailResponse> => {
    const token = getToken();
    return apiRequest<CategoryDetailResponse>(`/v1/categories/${id}`, {
      token,
    });
  });
