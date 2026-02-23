import { z } from "zod";

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
  collectionIds: string[];
}
