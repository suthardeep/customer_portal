import type { ProductQueryParams } from "./types";

export const productKeys = {
  all: ["products"] as const,
  list: (params: ProductQueryParams) =>
    [...productKeys.all, "list", params] as const,
  listInfinite: (params: Omit<ProductQueryParams, "currentPage">) =>
    [...productKeys.all, "infinite", params] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  related: (id: string, limit: number) =>
    [...productKeys.all, "related", id, limit] as const,
};
