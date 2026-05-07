import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import type { WishlistCollection, WishlistProduct } from "./types/types";
import { wishlistKeys } from "./wishlistQueryFactory";
import {
  getAllCollectionIdsFromProductId,
  getWishlistCollectionDetailsById,
  getWishlistCollectionProductsById,
  getWishlistCollections,
} from "./wishlistService";
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
  collectionsProducts: (
    collectionId: string,
    params: Omit<PaginationQueryParams, "currentPage"> = {
      pageSize: COLLECTION_PRODUCTS_PAGE_SIZE,
    },
  ) =>
    queryOptions({
      queryKey: wishlistKeys.collectionProducts(collectionId, params),
      queryFn: async (): Promise<PaginatedResponse<WishlistProduct>> => {
        const response = await getWishlistCollectionProductsById({
          data: { collectionId, ...params },
        });
        return response.data;
      },
    }),

  collectionsByProduct: (productId: string, variantId?: string) =>
    queryOptions({
      queryKey: wishlistKeys.collectionsByProduct(productId, variantId),
      queryFn: async (): Promise<string[]> => {
        const response = await getAllCollectionIdsFromProductId({
          data: { productId, variantId },
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
      queryFn: async ({
        pageParam,
      }): Promise<PaginatedResponse<WishlistProduct>> => {
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
