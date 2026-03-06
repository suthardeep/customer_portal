import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";

export interface TrackingEvent {
  status: string;
  description: string;
  timestamp: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
}

export interface OrderItem {
  orderItemId: string;
  orderId: string;
  orderNumber: string;
  productName: string;
  mediaUrls: string[];
  productImage: string;
  amount: number;
  quantity: number;
  lifecycleStatus: OrderLifecycleStatus;
  paymentMethod: PaymentMethod;
  deliveredAt: string | null;
  aavakCoinsEarned: number;
  customerEarnedCoins: number;
  createdAt: string;
}

export interface OrderItemDetail extends OrderItem {
  orderDate: string;
  itemPrice: number;
  trackingId: string | null;
  carrierName: string | null;
  expectedDeliveryDate: string | null;
  trackingEvents: TrackingEvent[];
  shippingAddress: ShippingAddress;
  paymentStatus: PaymentStatus;
  canCancel: boolean;
  canReturn: boolean;
  returnWindowEndsAt: string | null;
  canRate: boolean;
  totalPrice: number;
}

export enum OrderLifecycleStatus {
  ORDER_INITIATED = "ORDER_INITIATED",
  ORDER_PLACED = "ORDER_PLACED",
  PACKED = "PACKED",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  DELIVERY_FAILED = "DELIVERY_FAILED",
  CANCELLED = "CANCELLED",
  RETURN_REQUESTED = "RETURN_REQUESTED",
  RETURN_PICKUP_SCHEDULED = "RETURN_PICKUP_SCHEDULED",
  RETURN_RECEIVED = "RETURN_RECEIVED",
  RETURN_COMPLETED = "RETURN_COMPLETED",
}

export enum PaymentMethod {
  PREPAID = "PREPAID",
  COD = "COD",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type OrderListResponse = BaseApiResponse<PaginatedResponse<OrderItem>>;
export type OrderDetailResponse = BaseApiResponse<OrderItemDetail>;

export interface InvoiceData {
  invoiceUrl: string;
}

export interface CancelOrderItemRequest {
  itemId: string;
  reason: string;
}

export interface ReturnOrderItemRequest {
  itemId: string;
  reason: string;
  description: string;
  images: string[];
}
