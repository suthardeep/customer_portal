import FallbackView from "@/components/empty-states/FallbackView";
import { Image } from "@/components/base/Image";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import { useCreateAddressMutation } from "@/features/account/my-address/addressMutations";
import AddAddressDialog from "@/features/account/my-address/components/AddAddressDialog";
import AddressSelector from "@/features/account/my-address/components/AddressSelector";
import AddressSelectorSheet from "@/features/account/my-address/components/AddressSelectorSheet";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import type {
  Address,
  AddressFormData,
} from "@/features/account/my-address/types/types";
import { checkoutQueries } from "@/features/checkout/checkoutQueries";
import { BuyNowItemCard } from "@/features/checkout/components/BuyNowItemCard";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";
import CheckoutSkeleton from "@/features/checkout/components/skeletons/CheckoutSkeleton";
import { NoAddressPrompt } from "@/features/checkout/components/NoAddressPrompt";
import { PaymentMethodSelector } from "@/features/checkout/components/PaymentMethodSelector";
import { GstDetailsCard } from "@/features/checkout/components/GstDetailsCard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  buildBuyNowPayload,
  useCheckoutStore,
} from "@/features/checkout/stores/checkoutStore";
import ApplyCouponsDialog from "@/features/cart/components/ApplyCouponsDialog";
import { stripIndianCountryCode } from "@/utils/stringHelpers";
import { useToggle } from "@/hooks/useToggle";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const buyNowSearchSchema = z.object({
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int().min(1),
  affiliateCode: z.string().optional(),
});

export const Route = createFileRoute("/_protected/buy-now")({
  validateSearch: buyNowSearchSchema,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(addressQueries.list());
  },
  pendingComponent: CheckoutSkeleton,
  errorComponent: (err) => (
    <FallbackView
      title="Failed to load checkout"
      subtitle={err?.error?.message ?? "Please try again later"}
      icon="ShoppingCart"
      color="danger"
    />
  ),
  component: BuyNowComponent,
});

function BuyNowComponent() {
  const { productId, variantId, quantity, affiliateCode } = Route.useSearch();
  const { data: addressList } = useSuspenseQuery(addressQueries.list());
  const { activeAddress, selectSavedAddress } = useSelectedAddressStore();
  const sheet = useToggle();
  const addDialog = useToggle();
  const couponDialog = useToggle();
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
    applyCoupon,
    removeCoupon,
  } = useCheckoutStore();

  const { user } = useAuth();
  const createAddress = useCreateAddressMutation();

  useEffect(() => {
    if (!activeAddress && addressList?.length) {
      const defaultAddress =
        addressList.find((a) => a.isDefault) ?? addressList[0];
      selectSavedAddress(defaultAddress);
    }
  }, []);

  const selectedAddress: Address | null =
    addressList?.find((a) => a.id === activeAddress?.id) ?? null;

  const hasNoAddresses = Array.isArray(addressList) && addressList.length === 0;

  const addressId = selectedAddress?.id ?? "";

  const sessionQuery = useQuery(
    checkoutQueries.buyNowSession(
      buildBuyNowPayload(addressId, variantId, quantity, {
        paymentMethod,
        coinsToApply,
        gstDetailsId,
        couponCode,
        affiliateCode,
      }),
    ),
  );

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
        {/* Left column */}
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

          {savedGstDetails && <GstDetailsCard gstDetails={savedGstDetails} />}

          {sessionQuery.data?.items[0] && (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-n-900">Order Item</p>
              <BuyNowItemCard item={sessionQuery.data.items[0]} />
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3 md:mt-6">
          {/* Apply Coupons */}
          {couponCode ? (
            <div className="flex items-center justify-between rounded-xl border border-success-300 bg-success-50 px-3 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="size-5 shrink-0">
                  <Image
                    src="/discount-3d-badge.png"
                    alt="discount-3d-badge-alt"
                  />
                </div>
                <p className="text-sm font-medium text-success-800 mr-auto truncate">
                  <span className="font-mono font-semibold">{couponCode}</span>{" "}
                  applied
                </p>
              </div>
              <button
                onClick={removeCoupon}
                className="shrink-0 text-xs font-semibold text-danger-600 hover:underline ml-2"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onClick={couponDialog.open}
              className="flex items-center gap-2 w-full cursor-pointer rounded-xl border border-n-400 bg-n-200 px-3 py-2.5"
            >
              <div className="size-5 shrink-0">
                <Image
                  src="/discount-3d-badge.png"
                  alt="discount-3d-badge-alt"
                />
              </div>
              <p className="text-sm font-medium text-n-900 mr-auto">
                Apply Coupon
              </p>
              <button className="text-sm font-semibold text-s-700 transition-colors hover:underline">
                View All
              </button>
            </div>
          )}

          <CheckoutSummary
            session={sessionQuery.data ?? null}
            isLoading={sessionQuery.isLoading || sessionQuery.isFetching}
            error={sessionQuery.error}
            paymentMethod={paymentMethod}
            addressId={selectedAddress?.id ?? null}
            isFullyCoveredByCoins={isFullyCoveredByCoins}
          />
        </div>
      </div>

      <AddressSelectorSheet
        isOpen={sheet.isOpen}
        onClose={sheet.close}
        selectedAddressId={selectedAddress?.id ?? null}
        onSelect={handleAddressSelect}
      />

      <ApplyCouponsDialog
        isOpen={couponDialog.isOpen}
        onClose={couponDialog.close}
        params={{ productId, variantId, quantity }}
        onApply={(code) => {
          applyCoupon(code);
          couponDialog.close();
        }}
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
