import { useEffect, useMemo } from "react";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import type { CartItem } from "../types/types";

/**
 * Bridges cart-item selection (checkboxes) with the shared checkout store so the
 * same selection drives the cart summary and the final checkout session.
 *
 * Reconciliation rules:
 * - First load (store selection empty): select all current cart items.
 * - Items removed from the cart: prune their ids so counts stay accurate.
 *
 * Selection keys on `CartItem.id` (cart-item id), which is what the
 * `selectedCartItemIds` API param expects.
 */
export function useSelectedCartItems(cartItems: CartItem[]) {
	const selectedCartItemIds = useCheckoutStore(
		(state) => state.selectedCartItemIds,
	);
	const setSelectedItems = useCheckoutStore((state) => state.setSelectedItems);
	const toggleSelectedItem = useCheckoutStore(
		(state) => state.toggleSelectedItem,
	);
	const clearSelectedItems = useCheckoutStore(
		(state) => state.clearSelectedItems,
	);

	const availableIds = useMemo(
		() => cartItems.map((item) => item.id),
		[cartItems],
	);

	useEffect(() => {
		if (availableIds.length === 0) return;

		// Seed "all selected" the first time we know the cart.
		if (selectedCartItemIds.length === 0) {
			setSelectedItems(availableIds);
			return;
		}

		// Prune ids for items no longer in the cart.
		const availableSet = new Set(availableIds);
		const pruned = selectedCartItemIds.filter((id) => availableSet.has(id));
		if (pruned.length !== selectedCartItemIds.length) {
			setSelectedItems(pruned);
		}
	}, [availableIds, selectedCartItemIds, setSelectedItems]);

	const selectedIds = useMemo(
		() => new Set(selectedCartItemIds),
		[selectedCartItemIds],
	);

	const totalCount = availableIds.length;
	const selectedCount = availableIds.filter((id) => selectedIds.has(id)).length;
	const allSelected = totalCount > 0 && selectedCount === totalCount;
	const someSelected = selectedCount > 0 && selectedCount < totalCount;

	const selectAll = () => setSelectedItems(availableIds);

	return {
		selectedIds,
		selectedCount,
		totalCount,
		allSelected,
		someSelected,
		toggle: toggleSelectedItem,
		selectAll,
		clearAll: clearSelectedItems,
	};
}
