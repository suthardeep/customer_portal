import type { PaginationQueryParams } from '@/types/general.types';

export const categoryKeys = {
  all: ['categories'] as const,
tree: () => ['categories', 'tree'] as const,
  // tree: (params?: PaginationQueryParams) => [...categoryKeys.all, 'tree', params] as const,
  detail: (id: string) => ['category', id] as const,
};
