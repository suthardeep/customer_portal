export type VariantTargetGender = "Unisex" | "Male" | "Female";

export interface VariantDiscounts {
  totalSavingsAmount: number;
  totalDiscountPercent: number;
  label: string;
  breakdown: object[];
}

export interface VariantOptionValue {
  id: string;
  value: string;
  groupId: string;
  groupName: string;
}

export interface ProductVariant {
  id: string;
  aavakSku: string;
  name: string;
  description?: string;
  mediaUrls: string[];
  bulletPoints?: string[];
  minOrderQuantity?: number;
  externalSku?: string | null;
  vendorSku?: string | null;
  mrp: number;
  sellingPrice: number;
  price: number;
  discountPercent: number;
  discounts: VariantDiscounts;
  aavakCoins: number;
  totalAavakCoinForUser: number;
  weightInGrams: number;
  quantity: number;
  isActive: boolean;
  sortOrder: number;
  optionValues: VariantOptionValue[];
}
