import type { ChipColor } from "@/components/base/chip/chip.types";
import { OrderLifecycleStatus, PaymentMethod } from "./types/types";

export const MY_ORDERS_PAGE_SIZE = 10;

export const ORDER_STATUS_CONFIG: Record<
  OrderLifecycleStatus,
  { color: ChipColor }
> = {
  [OrderLifecycleStatus.ORDER_INITIATED]: { color: "neutral" },
  [OrderLifecycleStatus.ORDER_PLACED]: { color: "primary" },
  [OrderLifecycleStatus.PACKED]: { color: "primary" },
  [OrderLifecycleStatus.SHIPPED]: { color: "primary" },
  [OrderLifecycleStatus.OUT_FOR_DELIVERY]: { color: "secondary" },
  [OrderLifecycleStatus.DELIVERED]: { color: "success" },
  [OrderLifecycleStatus.DELIVERY_FAILED]: { color: "danger" },
  [OrderLifecycleStatus.CANCELLED]: { color: "danger" },
  [OrderLifecycleStatus.RETURN_REQUESTED]: { color: "neutral" },
  [OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED]: { color: "neutral" },
  [OrderLifecycleStatus.RETURN_RECEIVED]: { color: "secondary" },
  [OrderLifecycleStatus.RETURN_COMPLETED]: { color: "success" },
};

export const ORDER_TRACKING_STEPS: OrderLifecycleStatus[] = [
  OrderLifecycleStatus.ORDER_PLACED,
  OrderLifecycleStatus.PACKED,
  OrderLifecycleStatus.SHIPPED,
  OrderLifecycleStatus.OUT_FOR_DELIVERY,
  OrderLifecycleStatus.DELIVERED,
];

export const TERMINAL_NON_DELIVERED_STATUSES: OrderLifecycleStatus[] = [
  OrderLifecycleStatus.CANCELLED,
  OrderLifecycleStatus.DELIVERY_FAILED,
  OrderLifecycleStatus.RETURN_REQUESTED,
  OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED,
  OrderLifecycleStatus.RETURN_RECEIVED,
  OrderLifecycleStatus.RETURN_COMPLETED,
];

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  [PaymentMethod.PREPAID]: "Prepaid",
  [PaymentMethod.COD]: "Cash on Delivery",
};

export const CANCEL_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Ordered by mistake",
  "Delivery time too long",
  "Other",
];

export const RETURN_REASONS = [
  "Defective or damaged product",
  "Wrong item received",
  "Product not as described",
  "Changed my mind",
  "Other",
];
