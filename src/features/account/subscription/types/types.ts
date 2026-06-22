import type { BaseApiResponse } from "@/types/baseApi.types";
import type { SubscriptionStatus, SubscriptionPeriod } from "./enums";

// --- Plans ---
export interface SubscriptionPlanItem {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  amount: number;
  unit_amount: number;
  currency: string;
  type: string;
  created_at: number;
  updated_at: number;
}

export interface SubscriptionPlan {
  id: string;
  entity: string;
  interval: number;
  period: SubscriptionPeriod;
  item: SubscriptionPlanItem;
  notes: string[];
  created_at: number;
}

export type SubscriptionPlansResponse = BaseApiResponse<SubscriptionPlan[]>;

// --- Current Subscription ---
export interface PendingSubscription {
  subscriptionId: string;
  billingStartsAt: string;
  planPeriod: string;
  planAmountInr: number;
}

export interface CurrentSubscription {
  id: string;
  customerId: string;
  planId: string;
  planPeriod: string;
  planAmountInr: number;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
  cancelledAt?: string;
  isPremiumActive: boolean;
  pendingSubscription?: PendingSubscription;
}

export type CurrentSubscriptionResponse = BaseApiResponse<CurrentSubscription>;

// --- Subscribe ---
export interface SubscribeRequest {
  planId: string;
}

export interface SubscribeResult {
  subscriptionId: string;
  shortUrl: string;
  key: string;
}

export type SubscribeResponse = BaseApiResponse<SubscribeResult>;
