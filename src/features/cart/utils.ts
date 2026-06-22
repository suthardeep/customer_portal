import type { CartItem, SkippedItem } from "./types/types";

export const getItemMoq = (item: Pick<CartItem, "minOrderQuantity">) =>
	item.minOrderQuantity ?? 1;

export const isBelowMoq = (
	item: Pick<CartItem, "quantity" | "minOrderQuantity">,
) => item.quantity < getItemMoq(item);

export const getSkippedItemReason = (item: SkippedItem): string => {
	switch (item.reason) {
		case "MOQ_NOT_MET":
			return `Minimum order quantity is ${item.minOrderQuantity}. Increase the quantity to include this item.`;
		case "INSUFFICIENT_STOCK":
			return "Not enough stock available. Reduce the quantity or remove this item.";
		case "PRODUCT_UNAVAILABLE":
			return "This product is no longer available.";
		case "pincode_not_serviceable":
			return "We can't deliver this item to the selected address.";
		case "vendor_cannot_ship_inter_state":
			return "The seller can't ship this item to your state.";
		case "VENDOR_LOCATION_MISSING":
		case "no_provider_configured":
			return "Delivery isn't available for this item right now.";
		default:
			return "This item can't be included in your order right now.";
	}
};
