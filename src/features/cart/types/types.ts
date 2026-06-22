import type {
	BuyNowItem,
	CheckoutDeliveryAddress,
	PaymentMethod,
	ShippingBreakdown,
} from "@/features/checkout/types/types";
import type { ProductDetail } from "@/features/products/types/types";
import type {
	ProductVariant,
	VariantOptionValue,
} from "@/features/products/types/variant.types";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type { SummaryCharge } from "@/types/general.types";

export type SkippedItemReason =
	| "PRODUCT_UNAVAILABLE"
	| "INSUFFICIENT_STOCK"
	| "MOQ_NOT_MET"
	| "VENDOR_LOCATION_MISSING"
	| "pincode_not_serviceable"
	| "vendor_cannot_ship_inter_state"
	| "no_provider_configured"
	| (string & {});

/** An item the backend excluded from the order, with the reason why. */
export interface SkippedItem {
	variantId: string;
	productName: string;
	reason: SkippedItemReason;
	minOrderQuantity: number;
}

export interface CartItemDiscounts {
	totalSavingsAmount: number;
	totalDiscountPercent: number;
	label: string;
	breakdown: object[];
}

export type CartOfferState =
	| "AUTO_APPLIED"
	| "READY_TO_CLAIM"
	| "CONDITIONS_NOT_YET_MET";

export interface CartOfferRewardProduct {
	productId: string;
	quantity: number;
	product: {
		id: string;
		slug: string;
		name: string;
		brand: { id: string; name: string; brandLogoUrl: string | null };
		mediaUrls: string[];
		variantId: string;
		aavakSku: string;
		mrp: number;
		sellingPrice: number;
		price: number;
		discountPercent: number;
		discounts: CartItemDiscounts | null;
		hasVariants: boolean;
		inStock: boolean;
		totalStock: number;
		optionValues: VariantOptionValue[];
	} | null;
}

export interface CartOffer {
	discountId: string;
	discountName: string;
	discountType: string;
	discountValue: number;
	offerState: CartOfferState;
	savingsAmount: number;
	message: string;
	badge: string;
	description: string | null;
	claimAction: { rewardProducts: CartOfferRewardProduct[] } | null;
	appliedToItems: { productId: string; savingsAmount: number }[];
}

export interface CartItem
	extends Pick<
			ProductDetail,
			| "name"
			| "brand"
			| "categoryPath"
			| "tags"
			| "avgRating"
			| "totalReviews"
			| "soldCount"
			| "viewCount"
			| "isFragile"
			| "totalStock"
		>,
		Pick<ProductVariant, "mediaUrls" | "minOrderQuantity"> {
	id: string;
	variantId: string;
	productId: string;
	aavakSku: string;
	quantity: number;
	price: number;
	subtotal: number;
	sellingPrice: number;
	mrp: number;
	discountPercent: number;
	discount: string | null;
	discounts: CartItemDiscounts | null;
	totalAavakCoinForUser: number;
	inStock: boolean;
	hasVariants: boolean;
	categoryId: string;
	weightInGrams: number;
	returnPolicy: string | null;
	optionValues: VariantOptionValue[];
}

export interface Cart {
	id: string;
	items: CartItem[];
	totalItems: number;
	offers: CartOffer[];
	charges: SummaryCharge[];
	subtotal: number;
	totalAmount: number;
}

export interface AddCartItemRequest {
	variantId: string;
	quantity: number;
}

export interface UpdateCartItemRequest {
	variantId: string;
	quantity: number;
}

export type DeleteCartItemRequest = Pick<UpdateCartItemRequest, "variantId">;

export interface MigrateCartRequest {
	sessionId: string;
}

export type CartResponse = BaseApiResponse<Cart>;

export interface CartSummaryParams {
	addressId?: string;
	pincode?: string;
	variantId?: string;
	quantity?: number;
	couponCode?: string;
	coinsToApply?: number;
	cartSessionId?: string;
	paymentMethod?: PaymentMethod;
	gstDetailsId?: string;
}

export interface CartSummaryResponse {
	items: BuyNowItem[];
	skippedItems: SkippedItem[];
	deliveryAddress: CheckoutDeliveryAddress | null;
	subtotal: number;
	couponCode?: string;
	couponDiscount: number;
	coinsApplied: number;
	shippingCharges: number;
	shippingBreakdown: ShippingBreakdown;
	cgst: number;
	sgst: number;
	igst: number;
	codCharges: number;
	handlingCharges: number;
	packagingCharges: number;
	/** Ordered price-summary line items (offers, delivery, taxes, fees). */
	charges: SummaryCharge[];
	totalTax: number;
	totalAmount: number;
	amountToPay: number;
	eWayBillRequired: boolean;
}
