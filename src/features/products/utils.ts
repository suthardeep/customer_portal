import type { ProductsListPageSearch } from "./productsSearchSchema";
import type {
	ProductDetail,
	ProductReturnPolicy,
	ProductVariant,
} from "./types/types";

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
		return (
			product.variants.find((v) => v.id === variantId) ?? product.variants[0]
		);
	}
	return product.variants[0];
}

/**
 * Finds the variant whose option values exactly match the given selection
 * (groupId -> valueId). Returns undefined when no variant matches.
 */
export function findMatchingVariant(
	variants: ProductVariant[],
	selectedValues: Record<string, string>,
): ProductVariant | undefined {
	return variants.find((v) =>
		v.optionValues.every((ov) => selectedValues[ov.groupId] === ov.id),
	);
}

/**
 * Whether picking `valueId` for `groupId` (keeping the rest of the current
 * selection) leads to no in-stock variant — used to grey out/cross out chips.
 */
export function isValueUnavailable(
	groupId: string,
	valueId: string,
	variants: ProductVariant[],
	selectedValues: Record<string, string>,
): boolean {
	const candidate = { ...selectedValues, [groupId]: valueId };
	return !variants.some(
		(v) =>
			v.optionValues.every((ov) => candidate[ov.groupId] === ov.id) &&
			v.quantity > 0,
	);
}

export function getReturnPolicyLabel(
	returnPolicy: ProductReturnPolicy,
): string {
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
