import { BaseApiResponse } from '@/types/baseApi.types';
import type { IconName } from '@/components/base/icon/iconRegistry';
import type { ProductVariant } from './variant.types';

export type { ProductVariant } from './variant.types';

export enum ProductCustomFieldInputType {
  STRING = 'STRING',
  FILE = 'FILE',
}

export interface ProductOptionValue {
  id: string;
  value: string;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  values: ProductOptionValue[];
}

export interface ProductSeller {
  id: string;
  name: string;
  businessName: string | null;
  avgRating: number;
  totalReviews: number;
  joinedDate: string;
}

export interface ProductReturnPolicy {
  type: string;
  periodDays: number | null;
  description: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  description?: string;
  mediaUrls: string[];
  bulletPoints?: string[];
  tags?: string[];
  customFields?: Array<{
    groupName: string;
    fields: Array<{
      id: string;
      name: string;
      inputValueType: ProductCustomFieldInputType;
      value: string;
    }>;
  }>;
  hsnCode?: string;
  gstRate?: number;
  cessCode?: string;
  modelNumber?: string;
  modelName?: string | null;
  manufacturerName?: string;
  packerDetails?: string;
  importerDetails?: string;
  countryOfOrigin?: string;
  minOrderQuantity?: number;
  sizeChartId?: string | null;
  isFragile: boolean;
  externalSku?: string | null;
  minPrice: number;
  maxPrice: number;
  totalStock: number;
  totalVariants: number;
  viewCount: number;
  soldCount: number;
  totalReviews: number;
  avgRating: number;
  brand?: { id: string; name: string; brandLogoUrl?: string };
  categories?: Array<{ id: string; name: string; image: string | null; level: string }>;
  categoryPath?: string[];
  seller?: ProductSeller;
  returnPolicy?: ProductReturnPolicy;
  optionGroups: ProductOptionGroup[];
  variants: ProductVariant[];
  createdAt: string;
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
  label: string;
  value: string;
}

// API Response (uses BaseApiResponse pattern)
export type ProductDetailResponse = BaseApiResponse<ProductDetail>;
