import { queryOptions } from '@tanstack/react-query';
import { getCategoriesTree, getCategoryById } from './categoriesService';
import { categoryKeys } from './categoryQueryFactory';
import type { PaginationQueryParams } from '@/types/general.types';
import type { PaginatedResponse } from '@/types/baseApi.types';
import type { Category } from './types/types';

export const categoryQueries = {
  tree: (params?: PaginationQueryParams) =>
    queryOptions({
      queryKey: categoryKeys.tree(),
      queryFn: async (): Promise<PaginatedResponse<Category>> => {
        const response = await getCategoriesTree({ data: params });
        return response.data;
      },
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: categoryKeys.detail(id),
      queryFn: async (): Promise<Category> => {
        const response = await getCategoryById({ data: id });
        return response.data;
      },
    }),
};
