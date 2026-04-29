export type VariantTargetGender = "Unisex" | "Male" | "Female";

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
  mrp: number;
  sellingPrice: number;
  price: number;
  discountPercent: number;
  aavakCoins: number;
  totalAavakCoinForUser: number;
  weightInGrams: number;
  quantity: number;
  isActive: boolean;
  sortOrder: number;
  optionValues: VariantOptionValue[];
}
