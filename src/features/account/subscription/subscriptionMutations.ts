import { showErrorToasts } from "@/components/toast";
import { useMutation } from "@tanstack/react-query";
import { cancelSubscription, subscribe } from "./subscriptionService";
import { queryClient } from "@/queryClient";
import { subscriptionKeys } from "./subscriptionQueryFactory";
import type { SubscribeRequest } from "./types/types";

export const useSubscribeMutation = () => {
  return useMutation({
    mutationFn: async (data: SubscribeRequest) => {
      const response = await subscribe({ data });
      return response.data;
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
