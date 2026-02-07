import { createServerFn } from '@tanstack/react-start';
import { getApiBaseUrl, ApiError } from '@/utils/api';
import { objectToSearchParams } from '@/utils/apiHelpers';
import type { PaginationQueryParams } from '@/types/general.types';
import type { CategoryTreeResponse, CategoryResponse } from './types/types';

export const getCategoriesTree = createServerFn({ method: 'GET' })
  .inputValidator((data?: PaginationQueryParams) => data)
  .handler(async ({ data }): Promise<CategoryTreeResponse> => {
    const apiBaseUrl = getApiBaseUrl();
    const queryString = objectToSearchParams(data);
    const url = `${apiBaseUrl}/v1/categories/public/tree${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch categories: ${response.statusText}`,
        response.status,
      );
    }

    return response.json();
  });

export const getCategoryById = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<CategoryResponse> => {
    const apiBaseUrl = getApiBaseUrl();
    const url = `${apiBaseUrl}/v1/categories/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch category: ${response.statusText}`,
        response.status,
      );
    }

    return response.json();
  });
