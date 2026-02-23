import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import type { Product } from "@/features/products/types/product.types";
import { wishlistKeys } from "./wishlistQueryFactory";
import {
  getWishlistCollectionDetailsById,
  getWishlistCollectionProductsById,
  getWishlistCollections,
} from "./wishlistService";
import type { WishlistCollection } from "./types/types";
import {
  COLLECTION_LIST_PAGE_SIZE,
  COLLECTION_PRODUCTS_PAGE_SIZE,
} from "./constants";

export const wishlistQueries = {
  collections: (
    params: PaginationQueryParams = {
      currentPage: 1,
      pageSize: COLLECTION_LIST_PAGE_SIZE,
    },
  ) =>
    queryOptions({
      queryKey: wishlistKeys.collections(params),
      queryFn: async (): Promise<PaginatedResponse<WishlistCollection>> => {
        const response = await getWishlistCollections({ data: params });
        return response.data;
      },
    }),
  collectionsDetails: (collectionId: string) =>
    queryOptions({
      queryKey: wishlistKeys.collectionDetails(collectionId),
      queryFn: async (): Promise<WishlistCollection> => {
        const response = await getWishlistCollectionDetailsById({
          data: collectionId,
        });
        return response.data;
      },
    }),

  collectionProductsInfinite: (
    collectionId: string,
    params: Omit<PaginationQueryParams, "currentPage"> = {
      pageSize: COLLECTION_PRODUCTS_PAGE_SIZE,
    },
  ) =>
    infiniteQueryOptions({
      queryKey: wishlistKeys.collectionProductsInfinite(collectionId, params),
      queryFn: async ({ pageParam }): Promise<PaginatedResponse<Product>> => {
        const response = await getWishlistCollectionProductsById({
          data: { collectionId, currentPage: pageParam, ...params },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),
};
