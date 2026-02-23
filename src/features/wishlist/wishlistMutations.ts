import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import { toast, showErrorToasts } from "@/components/toast";
import {
  createWishlistCollection,
  updateWishlistCollection,
  deleteWishlistCollection,
  addItemToCollection,
} from "./wishlistService";
import { wishlistKeys } from "./wishlistQueryFactory";
import type {
  CreateCollectionRequest,
  UpdateCollectionRequest,
  AddItemToCollectionRequest,
} from "./types/types";

export const useCreateCollectionMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateCollectionRequest) => {
      const response = await createWishlistCollection({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
      toast.success("Collection created successfully");
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
      toast.success("Collection updated successfully");
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
      toast.success("Collection deleted successfully");
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
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
