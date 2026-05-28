import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import type {
  AddItemToCollectionRequest,
  CreateCollectionRequest,
  RemoveItemFromWishlistRequest,
  UpdateCollectionRequest,
} from "./types/types";
import { COLLECTION_PRODUCTS_PAGE_SIZE } from "./constants";
import { wishlistKeys } from "./wishlistQueryFactory";
import {
  addItemToCollection,
  createWishlistCollection,
  deleteWishlistCollection,
  removeItemFromWishlist,
  updateWishlistCollection,
} from "./wishlistService";

export const useCreateCollectionMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateCollectionRequest) => {
      const response = await createWishlistCollection({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useUpdateCollectionMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateCollectionRequest) => {
      const response = await updateWishlistCollection({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeleteCollectionMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteWishlistCollection({ data: id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useAddItemToCollectionMutation = () => {
  return useMutation({
    mutationFn: async (data: AddItemToCollectionRequest) => {
      const response = await addItemToCollection({ data });
      return response.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
      });
      const previous = queryClient.getQueryData<string[]>(
        wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
      );
      queryClient.setQueryData<string[]>(
        wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
        (old) => {
          const ids = old ?? [];
          const toAdd = variables.collectionIds ?? [];
          return [...new Set([...ids, ...toAdd])];
        },
      );
      return { previous, productId: variables.productId, variantId: variables.variantId };
    },
    onError: (error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(
          wishlistKeys.collectionsByProduct(context.productId, context.variantId),
          context.previous,
        );
      }
      showErrorToasts(error);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
      });
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collections({ currentPage: 1, pageSize: 20 }),
      });
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collectionProducts("ALL", { pageSize: 100 }),
      });
      for (const collectionId of variables.collectionIds ?? []) {
        queryClient.invalidateQueries({
          queryKey: wishlistKeys.collectionProductsInfinite(collectionId, { pageSize: COLLECTION_PRODUCTS_PAGE_SIZE }),
        });
      }
    },
  });
};

export const useRemoveItemFromWishlistMutation = () => {
  return useMutation({
    mutationFn: async (data: RemoveItemFromWishlistRequest) => {
      const response = await removeItemFromWishlist({ data });
      return response.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
      });
      const previous = queryClient.getQueryData<string[]>(
        wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
      );
      queryClient.setQueryData<string[]>(
        wishlistKeys.collectionsByProduct(variables.productId, variables.variantId),
        (old) => {
          if (!old) return old;
          return variables.collectionId
            ? old.filter((id) => id !== variables.collectionId)
            : [];
        },
      );
      return { previous, productId: variables.productId, variantId: variables.variantId };
    },
    onError: (error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(
          wishlistKeys.collectionsByProduct(context.productId, context.variantId),
          context.previous,
        );
      }
      showErrorToasts(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
  });
};

export const useRemoveItemFromAllWishlistMutation = () => {
  return useMutation({
    mutationFn: async (data: RemoveItemFromWishlistRequest) => {
      const { collectionId, ...rest } = data;
      const response = await removeItemFromWishlist({ data: rest });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
