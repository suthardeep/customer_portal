import { showErrorToasts, toast } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import {
  addCartItem,
  clearCart,
  deleteCartItem,
  updateCartItem,
} from "./cartService";
import { cartKeys } from "./cartQueryFactory";
import type {
  AddCartItemRequest,
  DeleteCartItemRequest,
  UpdateCartItemRequest,
} from "./types/types";

export const useAddCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: AddCartItemRequest) => {
      const response = await addCartItem({ data });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useUpdateCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateCartItemRequest) => {
      const response = await updateCartItem({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeleteCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: DeleteCartItemRequest) => {
      const response = await deleteCartItem({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useClearCartMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await clearCart();
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
