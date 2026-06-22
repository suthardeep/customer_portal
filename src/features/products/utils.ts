import type {
  ProductDetail,
  ProductReturnPolicy,
  ProductVariant,
} from "./types/types";
import type { ProductsListPageSearch } from "./productsSearchSchema";

/**
 * Resolves the active variant for a product detail page: the variant matching
 * the given id, falling back to the first variant. Returns undefined only when
 * the product has no variants.
 */
export function resolveVariant(
  product: ProductDetail,
  variantId?: string,
): ProductVariant | undefined {
  if (!product.variants?.length) return undefined;
  if (variantId) {
    return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  }
  return product.variants[0];
}

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
