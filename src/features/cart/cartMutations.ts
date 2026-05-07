import { showErrorToasts, toast } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { haptic } from "@/utils/haptics";
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
  Cart,
  DeleteCartItemRequest,
  UpdateCartItemRequest,
} from "./types/types";

export const useAddCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: AddCartItemRequest) => {
      const response = await addCartItem({ data });
      return response.data;
    },
    onMutate: () => {
      haptic("medium");
    },
    onSuccess: (newItem) => {
      toast.success("Item added to cart");
      queryClient.setQueryData<Cart>(cartKeys.detail(), (old) => {
        if (!old) return old;
        return {
          ...old,
          items: [...old.items, newItem],
          totalItems: old.totalItems + 1,
        };
      });
    },
    onError: (error) => {
      haptic("error");
      showErrorToasts(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
};

export const useUpdateCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateCartItemRequest) => {
      const response = await updateCartItem({ data });
      return response.data;
    },
    onMutate: async (variables) => {
      haptic("medium");
      await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
      const previous = queryClient.getQueryData<Cart>(cartKeys.detail());
      queryClient.setQueryData<Cart>(cartKeys.detail(), (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item) =>
            item.variantId === variables.variantId
              ? {
                  ...item,
                  quantity: variables.quantity,
                  subtotal: item.sellingPrice * variables.quantity,
                }
              : item,
          ),
        };
      });
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKeys.detail(), context.previous);
      }
      showErrorToasts(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
    },
  });
};

export const useDeleteCartItemMutation = () => {
  return useMutation({
    mutationFn: async (data: DeleteCartItemRequest) => {
      const response = await deleteCartItem({ data });
      return response.data;
    },
    onMutate: async (variables) => {
      haptic("medium");
      await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
      const previous = queryClient.getQueryData<Cart>(cartKeys.detail());
      queryClient.setQueryData<Cart>(cartKeys.detail(), (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter(
            (item) => item.variantId !== variables.variantId,
          ),
          totalItems: old.totalItems - 1,
        };
      });
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKeys.detail(), context.previous);
      }
      showErrorToasts(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
    },
  });
};

export const useClearCartMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await clearCart();
      return response.data;
    },
    onMutate: async () => {
      haptic("heavy");
      await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
      const previous = queryClient.getQueryData<Cart>(cartKeys.detail());
      queryClient.setQueryData<Cart>(cartKeys.detail(), (old) => {
        if (!old) return old;
        return { ...old, items: [], totalItems: 0 };
      });
      return { previous };
    },
    onError: (error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(cartKeys.detail(), context.previous);
      }
      showErrorToasts(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
    },
  });
};
