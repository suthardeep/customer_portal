import type { Product as ProductListItem } from './product.types';
import type { BaseApiResponse } from '@/types/general.types';
import type { IconName } from '@/components/base/icon/iconRegistry';

// Core product detail (extends existing list type)
// For now, variants will be part of the response but not fully integrated
export interface ProductDetail extends Omit<ProductListItem, 'variants'> {
  description: string;
  bulletPoints?: string[];

  // API returns these but we'll handle variants later
  variantAttributes?: VariantAttribute[];
  variants?: ProductVariant[];

  // UI-specific fields (may need to be calculated/added)
  delivery?: DeliveryInfo;
  features?: ProductFeature[];
  highlights?: ProductHighlight[];
  offers?: ProductOffer[];
  rewards?: ProductRewards;
  specifications?: ProductSpecification[];
}

// Variant structures (for future use - API already returns this)
export interface VariantAttribute {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  price?: number;
  stock?: number;
  attributes: Record<string, string>; // e.g., { "color": "red", "size": "L" }
  images?: string[];
  available?: boolean;
}

// Delivery information (UI-specific, may be calculated)
export interface DeliveryInfo {
  estimatedDate: string;
  timeSlot: string;
  location: LocationInfo;
  charges: number;
  isFree: boolean;
}

export interface LocationInfo {
  pinCode: string;
  city: string;
  state: string;
}

// Features (icon badges - UI layer)
export interface ProductFeature {
  id: string;
  icon: IconName;
  label: string;
  description?: string;
}

// Highlights (grouped table data - UI layer)
export interface ProductHighlight {
  category: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

// Offers (bank/coupon/cashback - UI layer or separate endpoint)
export interface ProductOffer {
  id: string;
  type: 'bank' | 'coupon' | 'cashback';
  title: string;
  description: string;
  code?: string;
  bankName?: string;
  bankIcon?: string;
  termsLink?: string;
  validUntil?: string;
  minPurchase?: number;
}

// Rewards (UI layer or separate endpoint)
export interface ProductRewards {
  coins: number;
  points?: number;
  cashback?: number;
}

// Specifications (may come from product description or separate field)
export interface ProductSpecification {
  name: string;
  value: string;
}

// API Response (uses BaseApiResponse pattern)
export type ProductDetailResponse = BaseApiResponse<ProductDetail>;
