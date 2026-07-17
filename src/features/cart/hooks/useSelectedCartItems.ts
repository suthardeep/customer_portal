import { useEffect, useMemo } from "react";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import type { CartItem } from "../types/types";

/**
 * Bridges cart-item selection (checkboxes) with the shared checkout store so the
 * same selection drives the cart summary and the final checkout session.
 *
 * Reconciliation rules:
 * - First load (selection never initialized): select all current cart items.
 * - User-cleared selection stays empty — it is never re-seeded.
 * - Items removed from the cart: prune their ids so counts stay accurate.
 * - Cart emptied: reset initialization so a re-filled cart seeds all again.
 *
 * Selection keys on `CartItem.id` (cart-item id), which is what the
 * `selectedCartItemIds` API param expects.
 */
export function useSelectedCartItems(cartItems: CartItem[]) {
	const selectedCartItemIds = useCheckoutStore(
		(state) => state.selectedCartItemIds,
	);
	const selectionInitialized = useCheckoutStore(
		(state) => state.selectionInitialized,
	);
	const setSelectedItems = useCheckoutStore((state) => state.setSelectedItems);
	const toggleSelectedItem = useCheckoutStore(
		(state) => state.toggleSelectedItem,
	);
	const clearSelectedItems = useCheckoutStore(
		(state) => state.clearSelectedItems,
	);
	const initializeSelection = useCheckoutStore(
		(state) => state.initializeSelection,
	);
	const resetSelection = useCheckoutStore((state) => state.resetSelection);

	const availableIds = useMemo(
		() => cartItems.map((item) => item.id),
		[cartItems],
	);

	useEffect(() => {
		if (availableIds.length === 0) {
			// Cart emptied — clear selection and allow re-seeding when items return.
			if (selectionInitialized) {
				resetSelection();
			}
			return;
		}

		// Seed "all selected" only the first time we know the cart.
		if (!selectionInitialized) {
			initializeSelection(availableIds);
			return;
		}

		// Prune ids for items no longer in the cart.
		const availableSet = new Set(availableIds);
		const pruned = selectedCartItemIds.filter((id) => availableSet.has(id));
		if (pruned.length !== selectedCartItemIds.length) {
			setSelectedItems(pruned);
		}
	}, [
		availableIds,
		selectedCartItemIds,
		selectionInitialized,
		setSelectedItems,
		initializeSelection,
		resetSelection,
	]);

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
