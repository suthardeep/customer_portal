import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type {
  CurrentSubscriptionResponse,
  SubscribeRequest,
  SubscribeResponse,
  SubscriptionPlansResponse,
} from "./types/types";

export const getSubscriptionPlans = createServerFn({ method: "GET" }).handler(
  async (): Promise<SubscriptionPlansResponse> => {
    const token = getToken();
    return apiRequest<SubscriptionPlansResponse>("/v1/subscription/plans", {
      token,
    });
  },
);

export const getCurrentSubscription = createServerFn({ method: "GET" }).handler(
  async (): Promise<CurrentSubscriptionResponse> => {
    const token = getToken();
    return apiRequest<CurrentSubscriptionResponse>("/v1/subscription", {
      token,
    });
  },
);

export const subscribe = createServerFn({ method: "POST" })
  .inputValidator((data: SubscribeRequest) => data)
  .handler(async ({ data }): Promise<SubscribeResponse> => {
    const token = getToken();
    return apiRequest<SubscribeResponse>("/v1/subscription/subscribe", {
      method: "POST",
      body: data,
      token,
    });
  });

export const cancelSubscription = createServerFn({ method: "POST" }).handler(
  async (): Promise<void> => {
    const token = getToken();
    return apiRequest<void>("/v1/subscription/cancel", {
      method: "POST",
      token,
    });
  },
);
