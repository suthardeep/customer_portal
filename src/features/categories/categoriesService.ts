import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { CategoryTreeQueryParams } from "@/types/general.types";
import type {
  CategoryTreeResponse,
  CategoryDetailResponse,
} from "./types/types";

export const getCategoriesTree = createServerFn({ method: "GET" })
  .inputValidator((data?: CategoryTreeQueryParams) => data)
  .handler(async ({ data }): Promise<CategoryTreeResponse> => {
    return apiRequest<CategoryTreeResponse>("/v3/categories/public/tree", {
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
