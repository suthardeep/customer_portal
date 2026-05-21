import type { CategoryTreeQueryParams } from '@/types/general.types';

export const categoryKeys = {
  all: ['categories'] as const,
  tree: (params: CategoryTreeQueryParams) => [...categoryKeys.all, 'tree', params] as const,
  detail: (id: string) => ['category', id] as const,
};
