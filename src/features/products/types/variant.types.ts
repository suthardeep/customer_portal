export type VariantTargetGender = "Unisex" | "Male" | "Female";

export interface ProductVariant {
  id: string;
  aavakSku: string;
  sellerSku?: string;

  // combination: attribute name → display label (lowercase)
  combination: Record<string, string>;

  // attributes: attribute name → display value (may include extras like colorHex)
  attributes: Record<string, string>;

  // Pricing
  mrp: number;
  sellingPrice: number;
  price: number;
  discountPercent: number;
  aavakCoinsPrice: number;
  aavakCoinsEarned: number;
  platformCoinsEarned: number;

  // Inventory
  quantity: number;
  inStock: boolean;

  // Media
  mediaUrls: string[];

  // Targeting
  targetAge?: string;
  targetGender?: VariantTargetGender;

  // Dimensions (flat)
  weight: number;
  length: number;
  width: number;
  height: number;

  // Status
  isActive: boolean;
}
