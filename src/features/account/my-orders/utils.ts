import { prettyDate } from "@/utils/formatDateTime";
import { OrderLifecycleStatus } from "./types/types";

export function getOrderStatusDateLabel(
  status: OrderLifecycleStatus,
  createdAt: string,
  deliveredAt: string | null,
): string {
  switch (status) {
    case OrderLifecycleStatus.ORDER_INITIATED:
    case OrderLifecycleStatus.ORDER_PLACED:
      return `Ordered on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.PACKED:
      return `Packed on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.SHIPPED:
      return `Shipped on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.OUT_FOR_DELIVERY:
      return `Out for delivery`;
    case OrderLifecycleStatus.DELIVERED:
      return `Delivered on ${prettyDate(deliveredAt ?? createdAt)}`;
    case OrderLifecycleStatus.DELIVERY_FAILED:
      return `Delivery failed on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.CANCELLED:
      return `Cancelled on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.RETURN_REQUESTED:
      return `Return requested on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED:
      return `Pickup scheduled on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.RETURN_RECEIVED:
      return `Return received on ${prettyDate(createdAt)}`;
    case OrderLifecycleStatus.RETURN_COMPLETED:
      return `Return completed on ${prettyDate(createdAt)}`;
  }
}
