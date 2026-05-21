export type PaginationQueryParams = {
  currentPage?: number;
  pageSize?: number;
};

export type CategoryTreeQueryParams = PaginationQueryParams & {
  parentId?: string;
  mainCategoryId?: string;
};

export type GeneralQueryParams<_T = unknown> = PaginationQueryParams & {
  search?: string;
  sortByField?: string;
  isAscending?: boolean;
  fetchAll?: boolean;
  active?: string;
};