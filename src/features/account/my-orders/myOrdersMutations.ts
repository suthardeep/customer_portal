import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { cancelMyOrderItem, returnMyOrderItem } from "./myOrdersService";
import { myOrderKeys } from "./myOrdersQueryFactory";
import type {
  CancelOrderItemRequest,
  ReturnOrderItemRequest,
} from "./types/types";

export const useCancelMyOrderItemMutation = () => {
  return useMutation({
    mutationFn: async (data: CancelOrderItemRequest) => {
      const response = await cancelMyOrderItem({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myOrderKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useReturnMyOrderItemMutation = () => {
  return useMutation({
    mutationFn: async (data: ReturnOrderItemRequest) => {
      const response = await returnMyOrderItem({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myOrderKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
