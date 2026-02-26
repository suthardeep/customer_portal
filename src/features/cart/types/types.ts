import type { BaseApiResponse } from "@/types/baseApi.types";

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  quantity: number;
  price: string;
  subtotal: number;
  productName: string;
  aavakSku: string;
  sellingPrice: string;
  mrp: string;
  vendorId: string;
  aavakCoinsPrice: number;
  aavakCoinsEarned: number;
  cashbackPercent: number;
  productImage: string;
  status: string;
  variantName: string;
  variantImage?: string;
  attributes: Record<string, string>;
  inStock: boolean;
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
  id: string;
  quantity: number;
}

export type DeleteCartItemRequest = Pick<UpdateCartItemRequest, "id">;

export type CartResponse = BaseApiResponse<Cart>;
