import { Link } from "@tanstack/react-router";
import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import { SkippedItemsCard } from "@/features/cart/components/SkippedItemsCard";
import type { CartItem, SkippedItem } from "@/features/cart/types/types";
import { getSkippedItemReason } from "@/features/cart/utils";

interface CheckoutSkippedItemsProps {
	skippedItems: SkippedItem[] | undefined;
	cartItems: CartItem[];
}

export function CheckoutSkippedItems({
	skippedItems,
	cartItems,
}: CheckoutSkippedItemsProps) {
	if (!skippedItems?.length) return null;

	return (
		<SkippedItemsCard
			action={
				<Link to="/cart">
					<Button variant="filled" color="primary" size="sm">
						Edit cart
					</Button>
				</Link>
			}
		>
			{skippedItems.map((item) => {
				const image = cartItems.find((ci) => ci.variantId === item.variantId)
					?.mediaUrls?.[0];

				return (
					<div
						key={item.variantId}
						className="flex items-start gap-3 rounded-xl border border-n-300 bg-white p-3"
					>
						<div className="size-16 shrink-0 overflow-hidden rounded-lg">
							<Image src={image ?? ""} alt={item.productName} />
						</div>
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<p className="line-clamp-2 font-medium text-n-900">
								{item.productName}
							</p>
							<p className="text-sm font-medium text-danger-600">
								{getSkippedItemReason(item)}
							</p>
						</div>
					</div>
				);
			})}
		</SkippedItemsCard>
	);
}
