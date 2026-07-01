import type { CategoryTreeQueryParams } from "@/types/general.types";

/**
 * Shared params for the full category tree fetch.
 * Used by both the header tab nav and the category detail page so they
 * hit the same query key and reuse a single cached response.
 * pageSize is high enough to return all MAIN categories in one page.
 */
export const CATEGORY_TREE_PARAMS: CategoryTreeQueryParams = {
  currentPage: 1,
  pageSize: 100,
};
