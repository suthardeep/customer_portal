import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Badge } from "@/components/base/badge/Badge";
import { Button } from "@/components/base/button/Button";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { ResponsiveModal } from "@/components/base/ResponsiveModal";
import {
	useAddCartItemMutation,
	useDeleteCartItemMutation,
	useUpdateCartItemMutation,
} from "@/features/cart/cartMutations";
import { cartQueries } from "@/features/cart/cartQueries";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/cssHelpers";
import { toast } from "@/utils/toast";
import { QuickAddVariantSelectorSkeleton } from "./skeletons/QuickAddVariantSelectorSkeleton";

const QuickAddVariantSelector = lazy(() =>
	import("./QuickAddVariantSelector").then((m) => ({
		default: m.QuickAddVariantSelector,
	})),
);

interface ProductCardAddToCartProps {
	productId: string;
	variantId: string | undefined;
	hasVariants?: boolean;
	outOfStock?: boolean;
	minOrderQuantity?: number;
}

export function ProductCardAddToCart({
	productId,
	variantId,
	hasVariants,
	outOfStock,
	minOrderQuantity,
}: ProductCardAddToCartProps) {
	const moq = minOrderQuantity ?? 1;
	const { data: cart } = useQuery(cartQueries.detail());
	const addCartItemMutation = useAddCartItemMutation();
	const updateCartItemMutation = useUpdateCartItemMutation();
	const deleteCartItemMutation = useDeleteCartItemMutation();
	const selectorModal = useToggle();

	const cartItem = cart?.items.find((item) => item.variantId === variantId);
	const inCart = !!cartItem;

	// Distinct variants of this product currently in cart (one item = one variant).
	const variantCount =
		cart?.items.filter((item) => item.productId === productId).length ?? 0;

	const handleAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		// Single-variant products skip the selector and add the default variant.
		if (!hasVariants) {
			if (!variantId) return;
			addCartItemMutation.mutate({ variantId, quantity: moq });
			if (moq > 1) {
				toast.info(`Added ${moq} — minimum order for this item`);
			}
			return;
		}
		selectorModal.open();
	};

	const handleDecrement = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!cartItem) return;
		if (cartItem.quantity > moq) {
			updateCartItemMutation.mutate({
				variantId: cartItem.variantId,
				quantity: cartItem.quantity - 1,
			});
		} else {
			deleteCartItemMutation.mutate({ variantId: cartItem.variantId });
		}
	};

	const handleIncrement = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!cartItem) return;
		updateCartItemMutation.mutate({
			variantId: cartItem.variantId,
			quantity: cartItem.quantity + 1,
		});
	};

	if (outOfStock) {
		return (
			<Button
				className="rounded-md"
				size="sm"
				aria-label="Out of stock"
				disabled
			>
				Out of Stock
			</Button>
		);
	}

	// Multi-variant products always show a plain "Add" button (with a badge for
	// how many of this product's variants are in cart) that opens the selector.
	if (hasVariants) {
		return (
			<>
				<div className="relative mt-1.5 mr-1.5">
					<button
						type="button"
						onClick={handleAdd}
						aria-label="Add to cart"
						className="flex items-center justify-center h-7 w-14 rounded-md border border-p-950 bg-white text-sm font-semibold text-p-950 cursor-pointer transition-colors duration-300 hover:bg-p-50 select-none"
					>
						Add
					</button>
					<Badge count={variantCount} className="bg-p-500" />
				</div>

				{selectorModal.isOpen && (
					<ResponsiveModal
						isOpen={selectorModal.isOpen}
						onClose={selectorModal.close}
						title="Select variant"
					>
						<Suspense fallback={<QuickAddVariantSelectorSkeleton />}>
							<QuickAddVariantSelector
								productId={productId}
								defaultVariantId={variantId}
							/>
						</Suspense>
					</ResponsiveModal>
				)}
			</>
		);
	}

	// Single-variant products: morph between "Add" and the +/- quantity stepper.
	return (
		<div
			className={cn(
				"flex items-center h-7 overflow-hidden rounded-md transition-all duration-300 ease-in-out",
				inCart ? "w-18 bg-p-900" : "w-14 bg-white border border-p-950",
			)}
		>
			{/* Decrement — slides in from left */}
			<div
				className={cn(
					"transition-all duration-300 ease-in-out shrink-0",
					inCart ? "w-6 opacity-100" : "w-0 opacity-0 pointer-events-none",
				)}
			>
				<IconButton
					icon="Remove"
					size="sm"
					variant="ghost"
					color="neutral"
					onClick={handleDecrement}
					aria-label="Decrease quantity"
					className="bg-transparent! rounded-none size-6"
					iconClassName="text-white"
				/>
			</div>

			{/* Center label — morphs between "Add" and quantity number */}
			<button
				type="button"
				onClick={!inCart ? handleAdd : undefined}
				aria-label={inCart ? undefined : "Add to cart"}
				className={cn(
					"flex-1 h-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 select-none",
					inCart
						? "text-white cursor-default"
						: "text-p-950 cursor-pointer hover:text-p-950 hover:bg-p-50 disabled:opacity-40 disabled:cursor-not-allowed",
				)}
			>
				{inCart ? cartItem.quantity : "Add"}
			</button>

			{/* Increment — slides in from right */}
			<div
				className={cn(
					"transition-all duration-300 ease-in-out shrink-0",
					inCart ? "w-6 opacity-100" : "w-0 opacity-0 pointer-events-none",
				)}
			>
				<IconButton
					icon="Add"
					size="sm"
					variant="ghost"
					color="neutral"
					onClick={handleIncrement}
					aria-label="Increase quantity"
					className="bg-transparent! rounded-none size-6"
					iconClassName="text-white"
				/>
			</div>
		</div>
	);
}
