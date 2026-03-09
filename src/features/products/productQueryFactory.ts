import type { ProductQueryParams, SimilarProductsParams } from "./types";

export const productKeys = {
  all: ["products"] as const,
  list: (params: ProductQueryParams) =>
    [...productKeys.all, "list", params] as const,
  listInfinite: (params: Omit<ProductQueryParams, "currentPage">) =>
    [...productKeys.all, "infinite", params] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  similar: (id: string, params?: Pick<SimilarProductsParams, "currentPage" | "pageSize">) =>
    [...productKeys.all, "similar", id, params] as const,
  similarInfinite: (id: string) =>
    [...productKeys.all, "similar-infinite", id] as const,
  autocomplete: (q: string) =>
    [...productKeys.all, "autocomplete", q] as const,
  searchSuggestions: () =>
    [...productKeys.all, "search-suggestions"] as const,
};
