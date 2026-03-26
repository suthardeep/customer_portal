import { queryOptions } from "@tanstack/react-query";
import { getCurrentSubscription, getSubscriptionPlans } from "./subscriptionService";
import { subscriptionKeys } from "./subscriptionQueryFactory";

export const subscriptionQueries = {
  plans: () =>
    queryOptions({
      queryKey: subscriptionKeys.plans(),
      queryFn: async () => {
        const response = await getSubscriptionPlans();
        return response.data;
      },
    }),

  current: () =>
    queryOptions({
      queryKey: subscriptionKeys.current(),
      queryFn: async () => {
        const response = await getCurrentSubscription();
        return response.data;
      },
    }),
};
