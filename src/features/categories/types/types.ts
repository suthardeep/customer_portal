import type { BaseApiResponse, PaginatedResponse } from '@/types/baseApi.types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  mainCategoryId?: string;
  fullPath: string;
  level: number;
  image?: string;
  images?: string[];
  isActive: boolean;
  subcategoryCount?: number;
  childCategoryCount?: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}

export interface CategoryDetail {
  category: Category;
  subCategories: Category[];
}

export type CategoryTreeResponse = BaseApiResponse<PaginatedResponse<Category>>;
export type CategoryDetailResponse = BaseApiResponse<CategoryDetail>;
