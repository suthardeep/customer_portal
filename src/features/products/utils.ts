import type { ProductReturnPolicy } from "./types/types";
import type { ProductsListPageSearch } from "./productsSearchSchema";

export function getReturnPolicyLabel(returnPolicy: ProductReturnPolicy): string {
  if (returnPolicy.periodDays) {
    return `${returnPolicy.periodDays}-Day Return`;
  }
  return returnPolicy.type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getProductsPageLabel(search: ProductsListPageSearch): string {
  if (search.search) return `"${search.search}"`;
  if (search.categoryId && search.categoryName) return search.categoryName;
  if (search.brandId && search.brandName) return search.brandName;
  return "All Products";
}
