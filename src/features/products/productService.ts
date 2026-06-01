import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type {
  AutocompleteParams,
  AutocompleteSuggestionsResponse,
  ProductListResponse,
  ProductQueryParams,
  SearchSuggestionsResponse,
  SimilarProductsParams,
} from "./types";
import type { ProductDetailResponse } from "./types/types";
import type { ProductReviewsApiResponse, ReviewsParams } from "./types/review.types";

export const getProductList = createServerFn({ method: "GET" })
  .inputValidator((data: ProductQueryParams) => data)
  .handler(async ({ data }): Promise<ProductListResponse> => {
    return apiRequest<ProductListResponse>("/v2/products/public/list", {
      params: data,
    });
  });

type GetProductByIdParams = { productId: string; isAd?: boolean };

// Get product by ID
export const getProductById = createServerFn({ method: "GET" })
  .inputValidator((data: GetProductByIdParams) => data)
  .handler(async ({ data }): Promise<ProductDetailResponse> => {
    const { productId, isAd } = data;
    const token = getToken();

    return apiRequest<ProductDetailResponse>(
      `/v2/products/public/details/${productId}`,
      { token, params: isAd ? { isAd: true } : undefined },
    );
  });

export const getSimilarProducts = createServerFn({ method: "GET" })
  .inputValidator((data: SimilarProductsParams) => data)
  .handler(async ({ data }): Promise<ProductListResponse> => {
    const { productId, ...params } = data;
    return apiRequest<ProductListResponse>(
      `/v1/products/public/similar/${productId}`,
      { params },
    );
  });

export const getAutocomplete = createServerFn({ method: "GET" })
  .inputValidator((data: AutocompleteParams) => data)
  .handler(async ({ data }): Promise<AutocompleteSuggestionsResponse> => {
    return apiRequest<AutocompleteSuggestionsResponse>(
      "/v1/products/public/autocomplete",
      { params: data },
    );
  });

export const getSearchSuggestions = createServerFn({ method: "GET" }).handler(
  async (): Promise<SearchSuggestionsResponse> => {
    return apiRequest<SearchSuggestionsResponse>(
      "/v1/products/public/search-suggestions",
    );
  },
);

export const getComplementaryProducts = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: productId }): Promise<ProductListResponse> => {
    return apiRequest<ProductListResponse>(
      `/v2/products/public/complementary/${productId}`,
    );
  });

export const getProductReviews = createServerFn({ method: "GET" })
  .inputValidator((data: ReviewsParams) => data)
  .handler(async ({ data }): Promise<ProductReviewsApiResponse> => {
    const { productId, ...params } = data;
    return apiRequest<ProductReviewsApiResponse>(
      `/v1/products/public/${productId}/reviews`,
      { params },
    );
  });
