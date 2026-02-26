import { queryOptions } from '@tanstack/react-query';
import { getCategoriesTree, getCategoryById, getCategoryTree } from './categoriesService';
import { categoryKeys } from './categoryQueryFactory';
import type { PaginationQueryParams } from '@/types/general.types';
import type { PaginatedResponse } from '@/types/baseApi.types';
import type { Category, CategoryDetail, CategoryTree } from './types/types';

export const categoryQueries = {
  tree: (params: PaginationQueryParams) =>
    queryOptions({
      queryKey: categoryKeys.tree(params),
      queryFn: async (): Promise<PaginatedResponse<Category>> => {
        const response = await getCategoriesTree({ data: params });
        return response.data;
      },
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: categoryKeys.detail(id),
      queryFn: async (): Promise<CategoryDetail> => {
        const response = await getCategoryById({ data: id });
        return response.data;
      },
    }),
  categoryTree: (id: string) =>
    queryOptions({
      queryKey: categoryKeys.categoryTree(id),
      queryFn: async (): Promise<CategoryTree> => {
        const response = await getCategoryTree({ data: id });
        return response.data;
      },
    }),
};
