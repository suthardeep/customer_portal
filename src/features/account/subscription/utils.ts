import { SubscriptionStatus } from "./types/enums";

const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.CREATED]: "Created",
  [SubscriptionStatus.AUTHENTICATED]: "Authenticated",
  [SubscriptionStatus.ACTIVE]: "Active",
  [SubscriptionStatus.PENDING]: "Pending renewal",
  [SubscriptionStatus.PAUSED]: "Paused",
  [SubscriptionStatus.HALTED]: "Halted",
  [SubscriptionStatus.CANCELLED]: "Cancelled",
  [SubscriptionStatus.COMPLETED]: "Completed",
  [SubscriptionStatus.RESUMED]: "Resumed",
  [SubscriptionStatus.EXPIRED]: "Expired",
};

export const getSubscriptionStatusLabel = (status: SubscriptionStatus): string =>
  SUBSCRIPTION_STATUS_LABELS[status] ?? status;
