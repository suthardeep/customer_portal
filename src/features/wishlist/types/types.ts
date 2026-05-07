import { z } from "zod";
import type { Product } from "@/features/products/types/product.types";

export type WishlistProduct = Pick<
  Product,
  | "name"
  | "brandName"
  | "brandId"
  | "brandLogoUrl"
  | "mediaUrls"
  | "tags"
  | "hasVariants"
  | "avgRating"
  | "reviewCount"
  | "soldCount"
  | "categoryId"
  | "categoryPath"
  | "categories"
  | "createdAt"
  | "variantId"
> & {
  id: string; // wishlist item id
  productId: string;
};

export interface WishlistCollection {
  id: string;
  customerId: string;
  name: string;
  isDefault: boolean;
  itemCount: number;
  itemImages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCollectionRequest {
  name: string;
  isDefault?: boolean;
  items?: Array<{
    productId: string;
    variantId: string;
  }>;
}

export interface UpdateCollectionRequest {
  id: string;
  name: string;
  isDefault?: boolean;
}

// Zod schema for form validation (shared for create/edit)
export const collectionFormSchema = z.object({
  name: z
    .string()
    .min(1, "Collection name is required")
    .max(100, "Collection name must be less than 100 characters"),
});

export type CollectionFormData = z.infer<typeof collectionFormSchema>;

export interface AddItemToCollectionRequest {
  productId: string;
  variantId: string;
  collectionIds?: string[];
}

export interface RemoveItemFromWishlistRequest {
  productId: string;
  variantId: string;
  collectionId?: string;
}
