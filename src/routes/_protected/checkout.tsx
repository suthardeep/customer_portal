import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { Alert } from "@/components/base/Alert";
import { Button } from "@/components/base/button/Button";
import FallbackView from "@/components/empty-states/FallbackView";
import { useCreateAddressMutation } from "@/features/account/my-address/addressMutations";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import AddAddressDialog from "@/features/account/my-address/components/AddAddressDialog";
import AddressSelector from "@/features/account/my-address/components/AddressSelector";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import type {
	Address,
	AddressFormData,
} from "@/features/account/my-address/types/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cartQueries } from "@/features/cart/cartQueries";
import { CartEmptyState } from "@/features/cart/components/CartEmptyState";
import type { Cart, CartItem } from "@/features/cart/types/types";
import { checkoutQueries } from "@/features/checkout/checkoutQueries";
import { CheckoutItemCard } from "@/features/checkout/components/CheckoutItemCard";
import { CheckoutSkippedItems } from "@/features/checkout/components/CheckoutSkippedItems";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";
import { GstDetailsCard } from "@/features/checkout/components/GstDetailsCard";
import { NoAddressPrompt } from "@/features/checkout/components/NoAddressPrompt";
import { PaymentMethodSelector } from "@/features/checkout/components/PaymentMethodSelector";
import CheckoutSkeleton, {
	CheckoutItemListSkeleton,
} from "@/features/checkout/components/skeletons/CheckoutSkeleton";
import {
	buildCheckoutPayload,
	useCheckoutStore,
} from "@/features/checkout/stores/checkoutStore";
import { useToggle } from "@/hooks/useToggle";
import { stripIndianCountryCode } from "@/utils/stringHelpers";

export const Route = createFileRoute("/_protected/checkout")({
	loader: async ({ context }) => {
		await Promise.all([
			context.queryClient.ensureQueryData(cartQueries.detail()),
			context.queryClient.ensureQueryData(addressQueries.list()),
		]);
	},
	headers: () => ({
		"Cache-Control": "private, no-store",
	}),
	pendingComponent: CheckoutSkeleton,
	errorComponent: (err) => (
		<FallbackView
			title="Failed to load checkout"
			subtitle={err?.error?.message ?? "Please try again later"}
			icon="ShoppingCart"
			color="danger"
		/>
	),
	component: CheckoutComponent,
});

function CheckoutComponent() {
	const { data: cart } = useSuspenseQuery(cartQueries.detail());

	if (!cart.totalItems) return <CartEmptyState />;

	return <CheckoutContent cart={cart} />;
}

function CheckoutContent({ cart }: { cart: Cart }) {
	const { data: addressList } = useSuspenseQuery(addressQueries.list());
	const { activeAddress, selectSavedAddress } = useSelectedAddressStore();
	const sheet = useToggle();
	const addDialog = useToggle();
	const {
		paymentMethod,
		coinsToApply,
		gstDetailsId,
		savedGstDetails,
		setPaymentMethod,
		applyCoins,
		removeCoins,
		isFullyCoveredByCoins,
		couponCode,
		affiliateCode,
	} = useCheckoutStore();

	const { user } = useAuth();
	const createAddress = useCreateAddressMutation();

	useEffect(() => {
		if (!activeAddress && addressList?.length) {
			const defaultAddress =
				addressList.find((a) => a.isDefault) ?? addressList[0];
			selectSavedAddress(defaultAddress);
		}
	}, [activeAddress, addressList, selectSavedAddress]);

	const selectedAddress: Address | null =
		addressList?.find((a) => a.id === activeAddress?.id) ?? null;

	const hasNoAddresses = Array.isArray(addressList) && addressList.length === 0;

	const addressId = selectedAddress?.id ?? "";

	const sessionPayload = useMemo(
		() =>
			buildCheckoutPayload(addressId, {
				paymentMethod,
				coinsToApply,
				gstDetailsId,
				couponCode,
				affiliateCode,
			}),
		[
			addressId,
			paymentMethod,
			coinsToApply,
			gstDetailsId,
			couponCode,
			affiliateCode,
		],
	);

	const sessionQuery = useQuery(checkoutQueries.session(sessionPayload));
	const session = sessionQuery.data;
	const isSessionLoading = sessionQuery.isFetching && !sessionQuery.data;
	const sessionError = sessionQuery.error;

	// Session is the authority for which items are in the order (skipped already
	// excluded). Join each to its full CartItem for the unchanged CheckoutItemCard.
	const orderItems = (session?.items ?? [])
		.map((si) => cart.items.find((ci) => ci.variantId === si.variantId))
		.filter((ci): ci is CartItem => Boolean(ci));

	if (session?.isExpired) {
		return (
			<FallbackView
				title="Your session has expired"
				subtitle="Please return to your cart and try again"
				icon="ShoppingCart"
				color="danger"
				footer={
					<div className="flex gap-3 mt-4">
						<Link to="/">
							<Button variant="outline">Continue Shopping</Button>
						</Link>
						<Link to="/cart">
							<Button>Go to Cart</Button>
						</Link>
					</div>
				}
			/>
		);
	}

	const handleApplyCoins = (coins: number) => {
		applyCoins(coins, sessionQuery.data?.amountToPay ?? Infinity);
	};

	const handleAddressSelect = (address: Address) => {
		selectSavedAddress(address);
		sheet.close();
	};

	const handleAddAddress = (data: AddressFormData) => {
		createAddress.mutate(data, {
			onSuccess: (newAddress) => {
				selectSavedAddress(newAddress);
				addDialog.close();
			},
		});
	};

	return (
		<div className="flex flex-col gap-6 p-4 pb-28 lg:pb-4">
			<div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-[1fr_400px] lg:items-start">
				{/* Left 70% */}
				<div className="flex flex-col gap-4">
					<div>
						<p className="font-semibold text-n-900 mb-1">Address</p>
						{hasNoAddresses ? (
							<NoAddressPrompt onAdd={addDialog.open} />
						) : (
							<AddressSelector
								selectedAddress={selectedAddress}
								onChange={sheet.open}
							/>
						)}
					</div>

					<PaymentMethodSelector
						value={paymentMethod}
						onChange={setPaymentMethod}
						isFullyCoveredByCoins={isFullyCoveredByCoins}
						isCoinsApplied={coinsToApply !== undefined}
						amountToPay={sessionQuery.data?.amountToPay ?? 0}
						coinsApplied={sessionQuery.data?.coinsApplied}
						onApplyCoins={handleApplyCoins}
						onRemoveCoins={removeCoins}
					/>

					{isSessionLoading ? (
						<CheckoutItemListSkeleton />
					) : (
						<div className="flex flex-col gap-3">
							<p className="font-semibold text-n-900">
								Order Items (
								{orderItems.reduce((sum, item) => sum + item.quantity, 0)})
							</p>
							{orderItems.map((item) => (
								<CheckoutItemCard key={item.id} item={item} />
							))}
							<CheckoutSkippedItems
								skippedItems={session?.skippedItems}
								cartItems={cart.items}
							/>
						</div>
					)}
				</div>

				{/* Right 30% */}
				<div className="flex flex-col gap-4">
					<CheckoutSummary
						session={sessionQuery.data ?? null}
						isLoading={sessionQuery.isLoading || sessionQuery.isFetching}
						error={sessionQuery.error}
						cart={cart}
						paymentMethod={paymentMethod}
						addressId={selectedAddress?.id ?? null}
						isFullyCoveredByCoins={isFullyCoveredByCoins}
					/>
					{savedGstDetails && <GstDetailsCard gstDetails={savedGstDetails} />}
				</div>
			</div>

			{sessionError && (
				<Alert variant="danger" title="We couldn't load your order">
					{sessionError.message}
				</Alert>
			)}

			<AddressSelectorSheet
				isOpen={sheet.isOpen}
				onClose={sheet.close}
				selectedAddressId={selectedAddress?.id ?? null}
				onSelect={handleAddressSelect}
			/>

			<AddAddressDialog
				isOpen={addDialog.isOpen}
				onClose={addDialog.close}
				onSubmit={handleAddAddress}
				isMutating={createAddress.isPending}
				defaultValues={{
					fullName: user?.fullName ?? "",
					phone: user?.phone ? stripIndianCountryCode(user.phone) : "",
					...(activeAddress && {
						addressLine1: activeAddress.addressLine1,
						addressLine2: activeAddress.addressLine2,
						landmark: activeAddress.landmark,
						city: activeAddress.city,
						state: activeAddress.state,
						pincode: activeAddress.pincode,
						latitude: activeAddress.latitude,
						longitude: activeAddress.longitude,
					}),
				}}
			/>
		</div>
	);
}
