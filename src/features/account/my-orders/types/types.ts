import { VariantOptionValue } from "@/features/products/types/variant.types";
import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { PaginationQueryParams } from "@/types/general.types";

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
  variantId: string;
  variantSku: string;
  brandName: string;
  brandId: string;
  brandLogoUrl: string | null;
  mediaUrls: string[];
  productImage: string;
  quantity: number;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  lifecycleStatus: OrderLifecycleStatus;
  paymentMethod: PaymentMethod;
  deliveredAt: string | null;
  aavakCoinsEarned: number;
  customerEarnedCoins: number;
  createdAt: string;
  optionValues: VariantOptionValue[];
}

export interface OrderPricing {
  subtotal: number;
  couponCode: string | null;
  couponDiscount: number;
  coinsApplied: number;
  shippingCharges: number;
  gstAmount: number;
  totalAmount: number;
  amountPaid: number;
}

export interface GstSnapshot {
  gstin: string;
  businessName: string;
  billingAddress: string;
}

export interface OrderItemDetail extends OrderItem {
  productId: string;
  itemPrice: number;
  trackingId: string | null;
  carrierName: string | null;
  expectedDeliveryDate: string | null;
  trackingEvents: TrackingEvent[];
  shippingAddress: ShippingAddress;
  paymentStatus: PaymentStatus;
  orderPricing: OrderPricing;
  gstSnapshot: GstSnapshot | null;
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

export type MyOrdersQueryParams = PaginationQueryParams & {
  lifecycleStatus?: OrderLifecycleStatus;
};

export type MyOrdersInfiniteParams = Omit<MyOrdersQueryParams, "currentPage">;

export type OrderListResponse = BaseApiResponse<PaginatedResponse<OrderItem>>;
export type OrderDetailResponse = BaseApiResponse<OrderItemDetail>;

export interface OrderDetailItem {
  id: string;
  productName: string;
  quantity: number;
  sellingPrice: number;
  aavakCoinsEarned: number;
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: string;
  deliveryCity: string;
  deliveryAddressId: string;
  paymentMethod: string;
  items: OrderDetailItem[];
  createdAt: string;
}

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
