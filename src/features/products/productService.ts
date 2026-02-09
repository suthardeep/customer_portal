import { createServerFn } from "@tanstack/react-start";
import { getApiBaseUrl, ApiError } from "@/utils/api";
import { objectToSearchParams } from "@/utils/apiHelpers";
import type { ProductQueryParams, ProductListResponse } from "./types";
import type { ProductDetailResponse } from "./types/types";
import { getCookies } from "@tanstack/react-start/server";

export const getProductList = createServerFn({ method: "GET" })
  .inputValidator((data: ProductQueryParams) => data)
  .handler(async ({ data }): Promise<ProductListResponse> => {
    const apiBaseUrl = getApiBaseUrl();
    const queryString = objectToSearchParams(data);
    const url = `${apiBaseUrl}/v1/products/public/list${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch products: ${response.statusText}`,
        response.status,
      );
    }

    return response.json();
  });

// Get product by ID
export const getProductById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: productId }): Promise<ProductDetailResponse> => {
    const cookies = getCookies();
    const baseUrl = getApiBaseUrl();

    const response = await fetch(
      `${baseUrl}/api/v1/products/public/details/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(cookies.access_token && {
            Authorization: `Bearer ${cookies.access_token}`,
          }),
        },
      }
    );

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch product details: ${response.statusText}`,
        response.status
      );
    }

    return response.json();
  });

// Get related products - TBD (endpoint not provided yet)
export const getRelatedProducts = createServerFn({ method: "GET" })
  .inputValidator((data: { productId: string; limit?: number }) => data)
  .handler(async () => {
    // TODO: Update with actual endpoint when available
    return { success: true, data: [], message: "Related products endpoint not yet implemented" };
  });
