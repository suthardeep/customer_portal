import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import type {
  AddItemToCollectionRequest,
  CreateCollectionRequest,
  RemoveItemFromWishlistRequest,
  UpdateCollectionRequest,
} from "./types/types";
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
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collectionsByProduct(payload.productId),
      });
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collections({ currentPage: 1, pageSize: 20 }),
      });
      queryClient.invalidateQueries({
        queryKey: wishlistKeys.collectionProducts("ALL", { pageSize: 100 }),
      });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useRemoveItemFromWishlistMutation = () => {
  return useMutation({
    mutationFn: async (data: RemoveItemFromWishlistRequest) => {
      const response = await removeItemFromWishlist({ data });
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
