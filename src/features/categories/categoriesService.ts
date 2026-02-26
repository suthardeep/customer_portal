import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { PaginationQueryParams } from "@/types/general.types";
import type {
  CategoryTreeResponse,
  CategoryDetailResponse,
  CategoryTreeDetailResponse,
} from "./types/types";

export const getCategoriesTree = createServerFn({ method: "GET" })
  .inputValidator((data?: PaginationQueryParams) => data)
  .handler(async ({ data }): Promise<CategoryTreeResponse> => {
    return apiRequest<CategoryTreeResponse>("/v2/categories/public/tree", {
      params: data,
    });
  });

export const getCategoryById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CategoryDetailResponse> => {
    const token = getToken();
    return apiRequest<CategoryDetailResponse>(`/v2/categories/${id}`, {
      token,
    });
  });

export const getCategoryTree = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CategoryTreeDetailResponse> => {
    return apiRequest<CategoryTreeDetailResponse>(`/v2/categories/${id}/tree`);
  });
