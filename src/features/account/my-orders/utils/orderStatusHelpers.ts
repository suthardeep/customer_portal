import { IconName } from "@/components/base/icon/icon.types";
import { OrderLifecycleStatus } from "../types/types";

export const getOrderStatusLabel = (status: OrderLifecycleStatus): string => {
  switch (status) {
    case OrderLifecycleStatus.ORDER_INITIATED:
      return "Initiated";
    case OrderLifecycleStatus.ORDER_PLACED:
      return "Order Placed";
    case OrderLifecycleStatus.PACKED:
      return "Packed";
    case OrderLifecycleStatus.SHIPPED:
      return "Shipped";
    case OrderLifecycleStatus.OUT_FOR_DELIVERY:
      return "Out for Delivery";
    case OrderLifecycleStatus.DELIVERED:
      return "Delivered";
    case OrderLifecycleStatus.DELIVERY_FAILED:
      return "Delivery Failed";
    case OrderLifecycleStatus.CANCELLED:
      return "Cancelled";
    case OrderLifecycleStatus.RETURN_REQUESTED:
      return "Return Requested";
    case OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED:
      return "Pickup Scheduled";
    case OrderLifecycleStatus.RETURN_RECEIVED:
      return "Return Received";
    case OrderLifecycleStatus.RETURN_COMPLETED:
      return "Return Completed";
    default:
      return status;
  }
};

export const getOrderStatusIcon = (status: OrderLifecycleStatus): IconName => {
  switch (status) {
    case OrderLifecycleStatus.ORDER_INITIATED:
      return "Package";
    case OrderLifecycleStatus.ORDER_PLACED:
      return "PackageAdd";
    case OrderLifecycleStatus.PACKED:
      return "PackagePacked";
    case OrderLifecycleStatus.SHIPPED:
      return "DeliverySent";
    case OrderLifecycleStatus.OUT_FOR_DELIVERY:
      return "DeliveryTracking";
    case OrderLifecycleStatus.DELIVERED:
      return "PackageDelivered";
    case OrderLifecycleStatus.DELIVERY_FAILED:
      return "DeliveryDelay";
    case OrderLifecycleStatus.CANCELLED:
      return "PackageRemove";
    case OrderLifecycleStatus.RETURN_REQUESTED:
      return "DeliveryReturn";
    case OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED:
      return "DeliveryReturn";
    case OrderLifecycleStatus.RETURN_RECEIVED:
      return "PackageOpen";
    case OrderLifecycleStatus.RETURN_COMPLETED:
      return "PackageDelivered";
    default:
      return "Package";
  }
};

export const getOrderStatusColor = (
  status: OrderLifecycleStatus,
): { bg: string; text: string } => {
  switch (status) {
    case OrderLifecycleStatus.ORDER_INITIATED:
      return { bg: "bg-gray-400", text: "text-gray-400" };
    case OrderLifecycleStatus.ORDER_PLACED:
      return { bg: "bg-blue-500", text: "text-blue-500" };
    case OrderLifecycleStatus.PACKED:
      return { bg: "bg-indigo-500", text: "text-indigo-500" };
    case OrderLifecycleStatus.SHIPPED:
      return { bg: "bg-violet-500", text: "text-violet-500" };
    case OrderLifecycleStatus.OUT_FOR_DELIVERY:
      return { bg: "bg-orange-500", text: "text-orange-500" };
    case OrderLifecycleStatus.DELIVERED:
      return { bg: "bg-green-500", text: "text-green-500" };
    case OrderLifecycleStatus.DELIVERY_FAILED:
      return { bg: "bg-red-500", text: "text-red-500" };
    case OrderLifecycleStatus.CANCELLED:
      return { bg: "bg-red-400", text: "text-red-400" };
    case OrderLifecycleStatus.RETURN_REQUESTED:
      return { bg: "bg-amber-500", text: "text-amber-500" };
    case OrderLifecycleStatus.RETURN_PICKUP_SCHEDULED:
      return { bg: "bg-amber-400", text: "text-amber-400" };
    case OrderLifecycleStatus.RETURN_RECEIVED:
      return { bg: "bg-teal-500", text: "text-teal-500" };
    case OrderLifecycleStatus.RETURN_COMPLETED:
      return { bg: "bg-teal-600", text: "text-teal-600" };
    default:
      return { bg: "bg-gray-400", text: "text-gray-400" };
  }
};
