import type { ProductsListPageSearch } from "./productsSearchSchema";

export function getProductsPageLabel(search: ProductsListPageSearch): string {
  if (search.search) return `"${search.search}"`;
  if (search.categoryId && search.categoryName) return search.categoryName;
  if (search.brandId && search.brandName) return search.brandName;
  return "All Products";
}
