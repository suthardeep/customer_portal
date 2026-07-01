import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { cartQueries } from "../cartQueries";

const pincodeSchema = z.object({
	pincode: z
		.string()
		.length(6, "Enter a valid 6-digit pincode")
		.regex(/^\d+$/, "Digits only"),
});
type PincodeFormData = z.infer<typeof pincodeSchema>;

export function useCartSummary() {
	const { couponCode, gstDetailsId, selectedCartItemIds } = useCheckoutStore();
	const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
	const { data: addressList, isLoading: isAddressLoading } = useQuery({
		...addressQueries.list(),
		enabled: isAuthenticated,
	});
	const { activeAddress, selectSavedAddress } = useSelectedAddressStore();

	const [confirmedPincode, setConfirmedPincode] = useState(
		activeAddress?.pincode ?? "",
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<PincodeFormData>({
		resolver: zodResolver(pincodeSchema),
		defaultValues: { pincode: activeAddress?.pincode ?? "" },
	});

	useEffect(() => {
		if (activeAddress?.pincode) {
			reset({ pincode: activeAddress.pincode });
			setConfirmedPincode(activeAddress.pincode);
		}
	}, [activeAddress?.pincode, reset]);

	const effectivePincode = confirmedPincode;

	const summaryParams = {
		...(activeAddress?.id
			? { addressId: activeAddress.id }
			: effectivePincode
				? { pincode: effectivePincode }
				: {}),
		...(couponCode && { couponCode }),
		...(gstDetailsId && { gstDetailsId }),
		...(selectedCartItemIds.length > 0 && { selectedCartItemIds }),
	};

	const authAndAddressReady =
		!isAuthLoading && (!isAuthenticated || !isAddressLoading);

	const summaryQuery = useQuery({
		...cartQueries.summary(summaryParams),
		enabled: !!activeAddress?.id || !!effectivePincode,
		refetchOnWindowFocus: false,
	});

	const summary = summaryQuery.data;
	const skippedItems = summary?.skippedItems ?? [];
	const skippedVariantIds = new Set(skippedItems.map((s) => s.variantId));

	// True only on the first fetch (enabled + in-flight, no data yet). Stays
	// false when the query is disabled (no address/pincode) and on background
	// refetches after a cart mutation, so the list isn't blanked each change.
	const isSummaryLoading = summaryQuery.isFetching && !summaryQuery.data;

	const onPincodeSubmit = handleSubmit((data) =>
		setConfirmedPincode(data.pincode),
	);

	return {
		summaryQuery,
		summary,
		skippedItems,
		skippedVariantIds,
		isSummaryLoading,
		summaryParams,
		authAndAddressReady,
		hasNoSavedAddresses: !addressList?.length,
		activeAddress,
		addressList,
		selectSavedAddress,
		registerPincode: register,
		onPincodeSubmit,
		isPincodeValid: isValid,
	};
}
