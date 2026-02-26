import type { Product } from "@/features/products/types/product.types";

export interface UserProductView {
  id: string;
  userId: string;
  product: Product;
  viewCount: number;
  durationSeconds: number;
  createdAt: string;
  lastViewedAt: string;
}
