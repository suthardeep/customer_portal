import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { subscriptionKeys } from "./subscriptionQueryFactory";
import { cancelSubscription, subscribe } from "./subscriptionService";
import type { SubscribeRequest } from "./types/types";

export const useSubscribeMutation = () => {
  return useMutation({
    mutationFn: async (data: SubscribeRequest) => {
      const response = await subscribe({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCancelSubscriptionMutation = () => {
  return useMutation({
    mutationFn: () => cancelSubscription(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.current() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
