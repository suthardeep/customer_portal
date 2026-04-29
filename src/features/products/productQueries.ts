import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import {
  getProductList,
  getProductById,
  getSimilarProducts,
  getAutocomplete,
  getSearchSuggestions,
} from "./productService";
import { productKeys } from "./productQueryFactory";
import type {
  AutocompleteParams,
  AutocompleteSuggestionsResponse,
  ProductQueryParams,
  SearchSuggestionsResponse,
  SimilarProductsParams,
} from "./types";

export const productQueries = {
  list: (params: ProductQueryParams) =>
    queryOptions({
      queryKey: productKeys.list(params),
      queryFn: async () => {
        const response = await getProductList({ data: params });
        return response.data;
      },
    }),

  listInfinite: (params: Omit<ProductQueryParams, "currentPage">) =>
    infiniteQueryOptions({
      queryKey: productKeys.listInfinite(params),
      queryFn: async ({ pageParam }) => {
        const response = await getProductList({
          data: { ...params, currentPage: pageParam },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  detail: (productId: string) =>
    queryOptions({
      queryKey: productKeys.detail(productId),
      queryFn: async () => {
        const response = await getProductById({ data: productId });
        return response.data;
      },
    }),

  similar: (params: SimilarProductsParams) =>
    queryOptions({
      queryKey: productKeys.similar(params.productId, {
        currentPage: params.currentPage,
        pageSize: params.pageSize,
      }),
      queryFn: async () => {
        const response = await getSimilarProducts({ data: params });
        return response.data;
      },
    }),

  similarInfinite: (productId: string, pageSize = 10) =>
    infiniteQueryOptions({
      queryKey: productKeys.similarInfinite(productId),
      queryFn: async ({ pageParam }) => {
        const response = await getSimilarProducts({
          data: { productId, currentPage: pageParam, pageSize },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  filters: (search: string) =>
    queryOptions({
      queryKey: productKeys.filters(search),
      queryFn: async () => {
        const response = await getProductList({
          data: { search, currentPage: 1, pageSize: 1 },
        });
        return response.data.filters;
      },
      staleTime: 5 * 60 * 1000,
    }),

  autocomplete: (params: AutocompleteParams) =>
    queryOptions({
      queryKey: productKeys.autocomplete(params.q),
      queryFn: async (): Promise<AutocompleteSuggestionsResponse> => {
        return getAutocomplete({ data: params });
      },
    }),

  searchSuggestions: () =>
    queryOptions({
      queryKey: productKeys.searchSuggestions(),
      queryFn: async (): Promise<SearchSuggestionsResponse> => {
        return getSearchSuggestions();
      },
    }),
};
