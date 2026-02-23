import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { Product } from "@/features/products/types/product.types";
import type {
  WishlistCollection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
  AddItemToCollectionRequest,
} from "./types/types";
import { createServerFn } from "@tanstack/react-start";

// GET /api/v1/wishlist/collections
export const getWishlistCollections = createServerFn({ method: "GET" })
  .inputValidator((data: PaginationQueryParams) => data)
  .handler(
    async ({
      data,
    }): Promise<BaseApiResponse<PaginatedResponse<WishlistCollection>>> => {
      const token = getToken();
      return apiRequest("/v1/wishlist/collections", {
        params: data,
        token,
      });
    },
  );

// GET /api/v1/wishlist/collections/{id}
export const getWishlistCollectionDetailsById = createServerFn({
  method: "GET",
})
  .inputValidator((collectionId: string) => collectionId)
  .handler(async ({ data: collectionId }): Promise<BaseApiResponse<WishlistCollection>> => {
    const token = getToken();
    return apiRequest(`/v1/wishlist/collections/${collectionId}`, {
      token,
    });
  });
export const getWishlistCollectionProductsById = createServerFn({
  method: "GET",
})
  .inputValidator(
    (data: { collectionId: string } & PaginationQueryParams) => data,
  )
  .handler(
    async ({ data }): Promise<BaseApiResponse<PaginatedResponse<Product>>> => {
      const { collectionId, ...params } = data;
      const token = getToken();
      return apiRequest(`/v1/wishlist/collections/${collectionId}/items`, {
        params,
        token,
      });
    },
  );

// POST /api/v1/wishlist/collections
export const createWishlistCollection = createServerFn({ method: "POST" })
  .inputValidator((data: CreateCollectionRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<WishlistCollection>> => {
    const token = getToken();
    console.log(token, data, "hello cre coll");

    return apiRequest("/v1/wishlist/collections", {
      method: "POST",
      body: data,
      token,
    });
  });

// PUT /api/v1/wishlist/collections/{id}
export const updateWishlistCollection = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateCollectionRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<WishlistCollection>> => {
    const { id, ...body } = data;
    const token = getToken();
    return apiRequest(`/v1/wishlist/collections/${id}`, {
      method: "PUT",
      body,
      token,
    });
  });

// POST /api/v1/wishlist/items
export const addItemToCollection = createServerFn({ method: "POST" })
  .inputValidator((data: AddItemToCollectionRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    return apiRequest("/v1/wishlist/items", {
      method: "POST",
      body: data,
      token,
    });
  });

// DELETE /api/v1/wishlist/collections/{id}
export const deleteWishlistCollection = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    return apiRequest(`/v1/wishlist/collections/${id}`, {
      method: "DELETE",
      token,
    });
  });
