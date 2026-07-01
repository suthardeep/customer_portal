import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { useAddCartItemMutation } from "@/features/cart/cartMutations";
import { formatCurrency } from "@/utils/formatCurrency";
import { toast } from "@/utils/toast";
import { productQueries } from "../productQueries";
import type { ProductVariant } from "../types";
import type { ProductDetail } from "../types/types";
import { findMatchingVariant, resolveVariant } from "../utils";
import { OptionGroupSelector } from "./ProductVariantSelector";
import { QuickAddVariantSelectorSkeleton } from "./skeletons/QuickAddVariantSelectorSkeleton";

interface QuickAddVariantSelectorProps {
	productId: string;
	/** The card's default variant, used as the initial selection. */
	defaultVariantId?: string;
	onAdded: () => void;
}

export function QuickAddVariantSelector({
	productId,
	defaultVariantId,
	onAdded,
}: QuickAddVariantSelectorProps) {
	const { data: product, isPending } = useQuery(
		productQueries.detail(productId),
	);

	if (isPending || !product) {
		return <QuickAddVariantSelectorSkeleton />;
	}

	return (
		<QuickAddVariantSelectorContent
			product={product}
			defaultVariantId={defaultVariantId}
			onAdded={onAdded}
		/>
	);
}

interface ContentProps {
	product: ProductDetail;
	defaultVariantId?: string;
	onAdded: () => void;
}

function QuickAddVariantSelectorContent({
	product,
	defaultVariantId,
	onAdded,
}: ContentProps) {
	const addCartItemMutation = useAddCartItemMutation();

	const initialVariant = resolveVariant(product, defaultVariantId);
	const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
		() =>
			Object.fromEntries(
				initialVariant?.optionValues.map((ov) => [ov.groupId, ov.id]) ?? [],
			),
	);

	const hasOptionGroups = product.optionGroups?.length > 0;

	const selectedVariant: ProductVariant | undefined = hasOptionGroups
		? findMatchingVariant(product.variants, selectedValues)
		: initialVariant;

	const moq = selectedVariant?.minOrderQuantity ?? 1;
	const stock = selectedVariant?.quantity ?? 0;
	const inStock = !!selectedVariant && stock > 0;

	const handleValueChange = (groupId: string, valueId: string) => {
		setSelectedValues((prev) => ({ ...prev, [groupId]: valueId }));
	};

	const handleAddToCart = () => {
		if (!selectedVariant || !inStock) return;
		addCartItemMutation.mutate(
			{ variantId: selectedVariant.id, quantity: moq },
			{
				onSuccess: () => {
					if (moq > 1) {
						toast.info(`Added ${moq} — minimum order for this item`);
					}
					onAdded();
				},
			},
		);
	};

	const displayVariant = selectedVariant ?? initialVariant;
	const imageUrl =
		displayVariant?.mediaUrls?.[0] ?? product.variants[0]?.mediaUrls?.[0];

	return (
		<div className="space-y-5">
			{/* Product header */}
			<div className="flex gap-3">
				<div className="size-20 shrink-0 overflow-hidden rounded-lg border border-n-300">
					<Image src={imageUrl ?? ""} alt={product.name} />
				</div>
				<div className="flex flex-col">
					<p className="line-clamp-2 font-medium text-n-900">{product.name}</p>
					{displayVariant && (
						<div className="mt-auto flex flex-wrap items-center gap-2">
							<h6 className="font-bold text-n-900">
								{formatCurrency(displayVariant.price)}
							</h6>
							{displayVariant.mrp > displayVariant.price && (
								<p className="text-n-700 line-through">
									{formatCurrency(displayVariant.mrp)}
								</p>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Variant option groups */}
			{hasOptionGroups && (
				<div className="space-y-5">
					{product.optionGroups.map((group) => (
						<OptionGroupSelector
							key={group.id}
							group={group}
							variants={product.variants}
							selectedValues={selectedValues}
							onValueChange={handleValueChange}
							sizeChartId={
								group.name.toLowerCase() === "size" ? product.sizeChartId : null
							}
						/>
					))}
				</div>
			)}

			{moq > 1 && (
				<p className="text-sm text-n-700">Min order for this item: {moq}</p>
			)}

			<Button
				fullWidth
				onClick={handleAddToCart}
				disabled={!inStock}
				isLoading={addCartItemMutation.isPending}
			>
				{inStock ? "Add to Cart" : "Out of Stock"}
			</Button>
		</div>
	);
}
