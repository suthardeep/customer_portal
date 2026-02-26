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

export type CategoryLevel = 'MAIN' | 'SUB' | 'CHILD';

export interface CategoryTreeNode {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  fullPath: string;
  level: CategoryLevel;
  images: string[];
  image: string | null;
  configId: string | null;
  inheritsFromParent: boolean;
  isActive: boolean;
  createdByAdminId: string;
  createdAt: string;
  updatedAt: string;
  children: CategoryTreeNode[];
}

export interface CategoryTree {
  category: CategoryTreeNode;
  children: CategoryTreeNode[];
  config: null;
  parentConfig: null;
  mainCategoryId: string;
}

export type CategoryTreeResponse = BaseApiResponse<PaginatedResponse<Category>>;
export type CategoryDetailResponse = BaseApiResponse<CategoryDetail>;
export type CategoryTreeDetailResponse = BaseApiResponse<CategoryTree>;
