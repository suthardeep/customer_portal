import type { CategoryInfo } from "@/features/products/types";

interface RecentlyViewedBrand {
  id: string;
  name: string;
  brandLogoUrl: string | null;
}

interface RecentlyViewedDiscounts {
  totalSavingsAmount: number;
  totalDiscountPercent: number;
  label: string;
  breakdown: object[];
}

export interface RecentlyViewedProduct {
  id: string;
  slug: string;
  name: string;
  brand: RecentlyViewedBrand;
  categoryId: string;
  categoryPath: string[];
  categories: (CategoryInfo & { level: "MAIN" | "SUB" | "CHILD" })[];
  mediaUrls: string[];
  variantId: string;
  aavakSku: string;
  returnPolicy: string | null;
  mrp: number;
  sellingPrice: number;
  price: number;
  discountPercent: number;
  discount: number | null;
  discounts: RecentlyViewedDiscounts;
  aavakCoins: number;
  totalAavakCoinForUser: number;
  inStock: boolean;
  totalStock: number;
  avgRating: number;
  totalReviews: number;
  soldCount: number;
  viewCount: number;
  hasVariants: boolean;
  tags: string[];
  isFragile: boolean;
  optionValues: object[];
  lastViewedAt: string;
}
