export type PaginationQueryParams = {
	currentPage?: number;
	pageSize?: number;
};

export type CategoryTreeQueryParams = PaginationQueryParams & {
	parentId?: string;
	mainCategoryId?: string;
};

export type GeneralQueryParams<_T = unknown> = PaginationQueryParams & {
	search?: string;
	sortByField?: string;
	isAscending?: boolean;
	fetchAll?: boolean;
	active?: string;
};

export type ChargeType = "TAX" | "CHARGE" | "DISCOUNT";

export type ChargeSign = "positive" | "negative";

/** A single line item in an order's price summary, returned by the backend. */
export interface SummaryCharge {
	key: string;
	label: string;
	amount: number;
	type: ChargeType;
	sign: ChargeSign;
	detail: string | null;
}
