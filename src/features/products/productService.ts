import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { ProductQueryParams, ProductListResponse } from "./types";
import type { ProductDetailResponse } from "./types/types";

export const getProductList = createServerFn({ method: "GET" })
  .inputValidator((data: ProductQueryParams) => data)
  .handler(async ({ data }): Promise<ProductListResponse> => {
    return apiRequest<ProductListResponse>("/v1/products/public/list", {
      params: data,
    });
  });

// Get product by ID
export const getProductById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: productId }): Promise<ProductDetailResponse> => {
    const token = getToken();

    return apiRequest<ProductDetailResponse>(
      `/v1/products/public/details/${productId}`,
      {
        token,
      }
    );
  });

// Get related products - TBD (endpoint not provided yet)
export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((data: { productId: string; limit?: number }) => data)
  .handler(async () => {
    // TODO: Update with actual endpoint when available
    return { success: true, data: [], message: "Related products endpoint not yet implemented" };
  });
