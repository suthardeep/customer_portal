import type { CartItem, SkippedItem } from "../types/types";
import { getSkippedItemReason } from "../utils";
import { CartItemCard } from "./CartItemCard";
import { SkippedItemsCard } from "./SkippedItemsCard";

interface SkippedItemsSectionProps {
	items: CartItem[];
	skippedItems: SkippedItem[];
	onQuantityChange: (id: string, quantity: number) => void;
	onDelete: (id: string) => void;
	isUpdating: boolean;
}

export function SkippedItemsSection({
	items,
	skippedItems,
	onQuantityChange,
	onDelete,
	isUpdating,
}: SkippedItemsSectionProps) {
	const rows = skippedItems
		.map((skipped) => ({
			skipped,
			item: items.find((i) => i.variantId === skipped.variantId),
		}))
		.filter((row): row is { skipped: SkippedItem; item: CartItem } =>
			Boolean(row.item),
		);

	if (rows.length === 0) return null;

	return (
		<SkippedItemsCard>
			{rows.map(({ item, skipped }) => (
				<div key={item.id} className="flex flex-col gap-1">
					<CartItemCard
						item={item}
						hideSelect
						hideMoqBanner
						onQuantityChange={onQuantityChange}
						onDelete={onDelete}
						isUpdating={isUpdating}
					/>
					<p className="px-1 text-xs font-medium text-danger-600">
						{getSkippedItemReason(skipped)}
					</p>
				</div>
			))}
		</SkippedItemsCard>
	);
}
