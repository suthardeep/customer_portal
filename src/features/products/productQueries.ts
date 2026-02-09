import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { getProductList, getProductById, getRelatedProducts } from "./productService";
import { productKeys } from "./productQueryFactory";
import type { ProductQueryParams } from "./types";

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

  related: (productId: string, limit: number = 4) =>
    queryOptions({
      queryKey: productKeys.related(productId, limit),
      queryFn: async () => {
        const response = await getRelatedProducts({ data: { productId, limit } });
        return response.data;
      },
    }),
};
