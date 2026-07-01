import { useEffect, useRef } from "react";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import type { CartItem } from "../types/types";
import { CartItemCard } from "./CartItemCard";
import { ClearCartButton } from "./ClearCartButton";

interface CartItemListProps {
	items: CartItem[];
	skippedVariantIds: Set<string>;
	selectedIds: Set<string>;
	selectedCount: number;
	allSelected: boolean;
	someSelected: boolean;
	onToggleItem: (id: string) => void;
	onSelectAll: () => void;
	onClearAll: () => void;
	onQuantityChange: (id: string, quantity: number) => void;
	onDelete: (id: string) => void;
	isUpdating: boolean;
}

export function CartItemList({
	items,
	skippedVariantIds,
	selectedIds,
	selectedCount,
	allSelected,
	someSelected,
	onToggleItem,
	onSelectAll,
	onClearAll,
	onQuantityChange,
	onDelete,
	isUpdating,
}: CartItemListProps) {
	const selectAllRef = useRef<HTMLInputElement>(null);

	const visibleItems = items.filter(
		(item) => !skippedVariantIds.has(item.variantId),
	);

	const totalCount = visibleItems.length;

	useEffect(() => {
		if (selectAllRef.current) {
			selectAllRef.current.indeterminate = someSelected;
		}
	}, [someSelected]);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			onSelectAll();
		} else {
			onClearAll();
		}
	};

	const handleSelectItem = (id: string) => {
		onToggleItem(id);
	};

	if (visibleItems.length === 0) return null;

	return (
		<div className="flex flex-col gap-3">
			{/* Selection header */}
			<div className="flex items-center gap-2 rounded-xl border border-n-400 bg-n-50 px-4 py-3 min-h-13.5">
				<Checkbox
					ref={selectAllRef}
					checked={allSelected}
					onChange={(e) => handleSelectAll(e.target.checked)}
					disabled={isUpdating}
				/>
				<p className="flex-1 font-medium text-n-800">
					{selectedCount}/{totalCount} Item{totalCount !== 1 ? "s" : ""}{" "}
					Selected
				</p>
				<ClearCartButton />
			</div>

			{visibleItems.map((item) => (
				<CartItemCard
					key={item.id}
					item={item}
					isSelected={selectedIds.has(item.id)}
					onSelectChange={handleSelectItem}
					onQuantityChange={onQuantityChange}
					onDelete={onDelete}
					isUpdating={isUpdating}
				/>
			))}
		</div>
	);
}
