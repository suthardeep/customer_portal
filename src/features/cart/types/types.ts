import type { BaseApiResponse } from "@/types/baseApi.types";
import type { ProductDetail } from "@/features/products/types/types";
import type { VariantOptionValue } from "@/features/products/types/variant.types";
import type {
  BuyNowItem,
  CheckoutDeliveryAddress,
  PaymentMethod,
  ShippingBreakdown,
} from "@/features/checkout/types/types";

export interface CartItem extends Pick<
  ProductDetail,
  | "name"
  | "brand"
  | "mediaUrls"
  | "categoryPath"
  | "tags"
  | "avgRating"
  | "totalReviews"
  | "soldCount"
  | "viewCount"
  | "isFragile"
  | "totalStock"
> {
  id: string;
  variantId: string;
  productId: string;
  aavakSku: string;
  quantity: number;
  price: number;
  subtotal: number;
  sellingPrice: number;
  mrp: number;
  discountPercent: number;
  discount: string | null;
  totalAavakCoinForUser: number;
  inStock: boolean;
  hasVariants: boolean;
  categoryId: string;
  weightInGrams: number;
  returnPolicy: string | null;
  optionValues: VariantOptionValue[];
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalItems: number;
}

export interface AddCartItemRequest {
  variantId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  variantId: string;
  quantity: number;
}

export type DeleteCartItemRequest = Pick<UpdateCartItemRequest, "variantId">;

export interface MigrateCartRequest {
  sessionId: string;
}

export type CartResponse = BaseApiResponse<Cart>;

export interface CartSummaryParams {
  addressId?: string;
  pincode?: string;
  variantId?: string;
  quantity?: number;
  couponCode?: string;
  coinsToApply?: number;
  cartSessionId?: string;
  paymentMethod?: PaymentMethod;
  gstDetailsId?: string;
}

export interface CartSummaryResponse {
  items: BuyNowItem[];
  deliveryAddress: CheckoutDeliveryAddress | null;
  subtotal: number;
  couponCode?: string;
  couponDiscount: number;
  coinsApplied: number;
  shippingCharges: number;
  shippingBreakdown: ShippingBreakdown;
  cgst: number;
  sgst: number;
  igst: number;
  codCharges: number;
  handlingCharges: number;
  packagingCharges: number;
  totalAmount: number;
  amountToPay: number;
  eWayBillRequired: boolean;
}
