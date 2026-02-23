import type { PaginationQueryParams } from "@/types/general.types";

export const wishlistKeys = {
  all: ["wishlist"] as const,
  collections: (params: PaginationQueryParams) =>
    ["wishlist", "collections", params] as const,
  collectionDetails: (collectionId: string) =>
    ["wishlist", "collection-details", collectionId] as const,
  collectionProducts: (collectionId: string) =>
    ["wishlist", "collection-products", collectionId] as const,
  collectionProductsInfinite: (
    collectionId: string,
    params: Omit<PaginationQueryParams, "currentPage">,
  ) => ["wishlist", "collection", collectionId, "infinite", params] as const,
};
