import type { PaginationQueryParams } from "@/types/general.types";

export const wishlistKeys = {
  all: ["wishlist"] as const,
  collections: (params: PaginationQueryParams) =>
    [...wishlistKeys.all, "collections", params] as const,
  collectionDetails: (collectionId: string) =>
    [...wishlistKeys.all, "collection-details", collectionId] as const,
  collectionProducts: (collectionId: string, params: PaginationQueryParams) =>
    [...wishlistKeys.all, "collection-products", collectionId, params] as const,
  collectionProductsInfinite: (
    collectionId: string,
    params: Omit<PaginationQueryParams, "currentPage">,
  ) =>
    [
      ...wishlistKeys.all,
      "collection",
      collectionId,
      "infinite",
      params,
    ] as const,
  collectionsByProduct: (productId: string) =>
    [...wishlistKeys.all, "collections-by-product", productId] as const,
};
