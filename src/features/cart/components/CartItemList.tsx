import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/base/button/Button";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import type { CartItem } from "../types/types";
import { CartItemCard } from "./CartItemCard";
import { ClearCartButton } from "./ClearCartButton";

interface CartItemListProps {
	items: CartItem[];
	skippedVariantIds: Set<string>;
	onQuantityChange: (id: string, quantity: number) => void;
	onDelete: (id: string) => void;
	isUpdating: boolean;
}

export function CartItemList({
	items,
	skippedVariantIds,
	onQuantityChange,
	onDelete,
	isUpdating,
}: CartItemListProps) {
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const selectAllRef = useRef<HTMLInputElement>(null);

	const visibleItems = items.filter(
		(item) => !skippedVariantIds.has(item.variantId),
	);

	const selectedCount = selectedIds.size;
	const totalCount = visibleItems.length;
	const allSelected = totalCount > 0 && selectedCount === totalCount;
	const someSelected = selectedCount > 0 && selectedCount < totalCount;

	useEffect(() => {
		if (selectAllRef.current) {
			selectAllRef.current.indeterminate = someSelected;
		}
	}, [someSelected]);

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(visibleItems.map((i) => i.variantId)));
		} else {
			setSelectedIds(new Set());
		}
	};

	const handleSelectItem = (id: string, checked: boolean) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) {
				next.add(id);
			} else {
				next.delete(id);
			}
			return next;
		});
	};

	const handleDelete = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
		onDelete(id);
	};

	const handleBulkRemove = () => {
		selectedIds.forEach((id) => {
			onDelete(id);
		});
		setSelectedIds(new Set());
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
				{selectedCount > 0 && (
					<Button
						variant="ghost"
						color="danger"
						size="sm"
						onClick={handleBulkRemove}
						disabled={isUpdating}
					>
						Remove Selected
					</Button>
				)}
				<ClearCartButton />
			</div>

			{visibleItems.map((item) => (
				<CartItemCard
					key={item.id}
					item={item}
					isSelected={selectedIds.has(item.variantId)}
					onSelectChange={handleSelectItem}
					onQuantityChange={onQuantityChange}
					onDelete={handleDelete}
					isUpdating={isUpdating}
				/>
			))}
		</div>
	);
}
