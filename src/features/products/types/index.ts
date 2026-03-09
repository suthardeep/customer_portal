import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { GeneralQueryParams } from "@/types/general.types";
import type { Product } from "./product.types";

export type { Product } from "./product.types";
export type { ProductVariant, VariantTargetGender } from "./variant.types";

export enum ProductStatus {
  DRAFT = "draft",
  UNDER_REVIEW = "under_review",
  REJECTED = "rejected",
  APPROVED = "approved",
  ARCHIVED = "archived",
}

export interface CategoryInfo {
  id: string;
  name: string;
  image?: string;
}

export interface ProductQueryParams extends GeneralQueryParams {
  categoryId?: string;
  brandId?: string;
  priceMin?: number;
  priceMax?: number;
  ratingMin?: number;
  tags?: string[];
  size?: string;
  color?: string;
  targetAge?: string;
  targetGender?: "Unisex" | "Male" | "Female";
  sortBy?: "price" | "rating" | "popularity" | "newest";
  source?: string;
}

export type ProductListResponse = BaseApiResponse<PaginatedResponse<Product>>;

export interface AutocompleteParams {
  q: string;
}

export type AutocompleteSuggestionsResponse = BaseApiResponse<{
  suggestions: string[];
}>;

export type SearchSuggestion = {
  keyword: string;
  productImage: string;
  productId: string;
};

export type SearchSuggestionsResponse = BaseApiResponse<{
  suggestions: SearchSuggestion[];
}>;

export type SimilarProductsParams = {
  productId: string;
} & Pick<GeneralQueryParams, "currentPage" | "pageSize">;
