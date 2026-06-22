import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/base/button/Button";
import { IconButton } from "@/components/base/icon-button/IconButton";
import {
	useAddCartItemMutation,
	useDeleteCartItemMutation,
	useUpdateCartItemMutation,
} from "@/features/cart/cartMutations";
import { cartQueries } from "@/features/cart/cartQueries";
import { cn } from "@/utils/cssHelpers";
import { toast } from "@/utils/toast";

interface ProductCardAddToCartProps {
	variantId: string | undefined;
	outOfStock?: boolean;
	minOrderQuantity?: number;
}

export function ProductCardAddToCart({
	variantId,
	outOfStock,
	minOrderQuantity,
}: ProductCardAddToCartProps) {
	const moq = minOrderQuantity ?? 1;
	const { data: cart } = useQuery(cartQueries.detail());
	const addCartItemMutation = useAddCartItemMutation();
	const updateCartItemMutation = useUpdateCartItemMutation();
	const deleteCartItemMutation = useDeleteCartItemMutation();

	const cartItem = cart?.items.find((item) => item.variantId === variantId);
	const inCart = !!cartItem;

	const handleAdd = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!variantId) return;
		addCartItemMutation.mutate({ variantId, quantity: moq });
		if (moq > 1) {
			toast.info(`Added ${moq} — minimum order for this item`);
		}
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
				disabled={!variantId}
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
