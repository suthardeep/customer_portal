export type PaymentMethod = "PREPAID" | "COD";

export interface CheckoutPayload {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  coinsToApply?: number;
  gstDetailsId?: string;
  affiliateCode?: string;
}

export interface ShippingBreakdown {
  baseCharge: number;
  weightCharge: number;
  distanceCharge: number;
  provider: string;
  serviceName: string;
  estimatedDays: number;
}

export interface CheckoutDeliveryAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  landmark: string | null;
  city: string;
  state: string;
  pincode: string;
  addressType: string;
  otherAddressLabel: string | null;
  fullAddress: string;
}

export interface BuyNowItem {
  productId: string;
  variantId: string;
  vendorId: string;
  aavakSku: string;
  brand: {
    id: string;
    name: string;
    brandLogoUrl: string;
  };
  quantity: number;
  price: number;
  sellingPrice: number;
  mrp: number;
  discountPercent: number;
  discount: string | null;
  mediaUrls: string[];
  totalAavakCoinForUser: number;
  aavakCoins: number;
  weightInGrams: number;
  returnPolicy: string | null;
  categoryId: string;
  categoryPath: string[];
  categories: {
    id: string;
    name: string;
    image: string | null;
    level: string;
  }[];
  optionValues: {
    id: string;
    value: string;
    groupId: string;
    groupName: string;
  }[];
  gstRate: number;
  hsnCode: string;
  name: string;
}

export interface CheckoutSession {
  id: string;
  customerId: string;
  type: string;
  sourceCartId: string | null;
  addressId: string;
  items: BuyNowItem[];
  deliveryAddress: CheckoutDeliveryAddress;
  couponCode: string | null;
  couponDiscount: number;
  coinsApplied: number;
  subtotal: number;
  shippingCharges: number;
  shippingBreakdown: ShippingBreakdown | null;
  cgst: number;
  sgst: number;
  igst: number;
  codCharges: number;
  handlingCharges: number;
  packagingCharges: number;
  totalAmount: number;
  amountToPay: number;
  paymentMethod: PaymentMethod;
  expiresAt: string;
  isExpired: boolean;
  isConverted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InitiatePaymentResponse {
  orderId: string;
  orderNumber: string;
  paymentRequired: boolean;
  paymentMethod: string;
  razorpayOrderId: string;
  amount: string;
  currency: string;
  key: string;
}

export interface CodOrderResponse {
  orderId: string;
  orderNumber: string;
  paymentRequired: boolean;
  paymentMethod: "COD";
  status: string;
  totalAmount: string;
}

export interface VerifyPaymentPayload {
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponseItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  vendorId: string;
  warehouseId: string;
  shipmentId: string | null;
  fulfillmentType: string;
  productName: string;
  variantSku: string;
  quantity: number;
  sellingPrice: number;
  price: number;
  mrp: number;
  platformCoins: number;
  mediaUrls: string[];
  inventoryId: string;
  aavakCoinsPrice: number;
  aavakCoinsEarned: number;
  categoryId: string;
  returnPolicy: string | null;
  returnReplacePeriodDays: number | null;
  itemStatus: string;
  statusReason: string | null;
  transferredFromWarehouseId: string | null;
  returnShipmentId: string | null;
}

export interface VerifyPaymentResponse {
  id: string;
  orderNumber: string;
  customerId: string;
  checkoutSessionId: string;
  status: string;
  subtotal: number;
  couponDiscount: number;
  shippingCharges: number;
  gstAmount: number;
  coinsApplied: number;
  totalAmount: number;
  amountPaid: number;
  deliveryAddressId: string;
  deliveryCity: string;
  couponCode: string | null;
  paymentMethod: PaymentMethod;
  gstDetailsId: string | null;
  gstSnapshot: {
    businessName: string;
    gstin: string;
    billingAddress: string;
  } | null;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  items: VerifyPaymentResponseItem[];
  createdAt: string;
  updatedAt: string;
}
