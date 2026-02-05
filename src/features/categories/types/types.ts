import type { BaseApiResponse, PaginatedResponse } from '@/types/baseApi.types';

export interface Category {
  id: string;
  name: string;
  slug: string;
  fullPath: string;
  level: number;
  image?: string;
  isActive: boolean;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  children: Category[];
}

export type CategoryTreeResponse = BaseApiResponse<PaginatedResponse<Category>>;
