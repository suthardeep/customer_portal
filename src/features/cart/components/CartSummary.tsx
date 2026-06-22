import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/base/button/Button";
import Divider from "@/components/base/Divider";
import ErrorText from "@/components/base/ErrorText";
import { Image } from "@/components/base/Image";
import { Icon } from "@/components/base/icon/Icon";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Input } from "@/components/base/input/Input";
import { TotalAavakCoinsEarned } from "@/components/base/TotalAavakCoinsEarned";
import GstSelectorSheet from "@/features/account/gst/components/GstSelectorSheet";
import { useCreateAddressMutation } from "@/features/account/my-address/addressMutations";
import AddAddressDialog from "@/features/account/my-address/components/AddAddressDialog";
import type { AddressFormData } from "@/features/account/my-address/types/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { stripIndianCountryCode } from "@/utils/stringHelpers";
import type { useCartSummary } from "../hooks/useCartSummary";
import type { Cart } from "../types/types";
import { isBelowMoq } from "../utils";
import ApplyCouponsDialog from "./ApplyCouponsDialog";
import { ChargesSummary } from "./ChargesSummary";
import { CartSummarySkeleton } from "./skeletons/CartSkeleton";

export function CartSummary({ cart, summary: cartSummary }: CartSummaryProps) {
  const gstToggle = useToggle();
  const applyCouponToggle = useToggle();
  const addAddressToggle = useToggle();
  const { savedGstDetails, clearGst, couponCode, applyCoupon, removeCoupon } =
    useCheckoutStore();
  const loginDialog = useLoginDialog();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const createAddress = useCreateAddressMutation();

  const {
    summaryQuery,
    summary,
    skippedItems,
    summaryParams,
    authAndAddressReady,
    hasNoSavedAddresses,
    activeAddress,
    addressList,
    selectSavedAddress,
    registerPincode,
    onPincodeSubmit,
    isPincodeValid,
  } = cartSummary;

  if (!authAndAddressReady || summaryQuery.isLoading)
    return <CartSummarySkeleton />;

  const totalCoins = cart.items.reduce(
    (acc, item) => acc + item.totalAavakCoinForUser * item.quantity,
    0,
  );

  const totalMrp = cart.items.reduce(
    (sum, item) => sum + item.mrp * item.quantity,
    0,
  );

  const subtotal = summary?.subtotal;
  const itemDiscount = subtotal !== undefined ? totalMrp - subtotal : 0;
  const charges = summary?.charges;
  const amountToPay = summary?.amountToPay;

  const handleClick = () => {
    if (!isAuthenticated) {
      loginDialog.open({
        onSuccess: () => navigate({ to: "/checkout" }),
      });
      return;
    }

    const hasSavedAddress = activeAddress?.id || addressList?.length;
    if (!hasSavedAddress) {
      addAddressToggle.open();
      return;
    }

    navigate({ to: "/checkout" });
  };

  const handleAddAddress = (data: AddressFormData) => {
    createAddress.mutate(data, {
      onSuccess: (newAddress) => {
        selectSavedAddress(newAddress);
        addAddressToggle.close();
        navigate({ to: "/checkout" });
      },
    });
  };

  const hasBelowMoqItems = cart.items.some(isBelowMoq);
  const hasSkippedItems = skippedItems.length > 0;
  const cannotContinue = hasBelowMoqItems || hasSkippedItems;

  const disableContinue =
    summaryQuery?.isError || summaryQuery?.isLoading || cannotContinue;
  const validSummary = !summaryQuery?.isError || summaryQuery?.isLoading;

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-xl border border-n-400 bg-n-50">
        {/* Apply Coupons section */}
        {validSummary && (
          <div className="p-4">
            {couponCode ? (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-success-300 bg-success-50 px-3 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="size-5 shrink-0">
                    <Image
                      src="/discount-3d-badge.png"
                      alt="discount-3d-badge-alt"
                    />
                  </div>
                  <p className="text-sm font-medium text-success-800 mr-auto truncate">
                    <span className="font-mono font-semibold">
                      {couponCode}
                    </span>{" "}
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
                onClick={applyCouponToggle.open}
                className="mt-3 flex items-center gap-2 w-full cursor-pointer rounded-xl border border-n-400 bg-n-200 px-3 py-2.5"
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
          </div>
        )}

        <hr className="border-n-200" />

        {/* Price Summary */}
        <div className="flex flex-col gap-3 p-4">
          <p className="font-semibold text-n-900">Price Summary</p>

          {hasNoSavedAddresses && (
            <form
              onSubmit={onPincodeSubmit}
              className="flex items-center gap-2"
            >
              <Input
                {...registerPincode("pincode")}
                placeholder="Enter pincode"
                size="sm"
                type="tel"
                maxLength={6}
                inputMode="numeric"
                rightElement={
                  <IconButton
                    icon="ChevronRight"
                    aria-label="pincode-input"
                    color="neutral"
                    size="sm"
                    className="bg-gray-200"
                    disabled={!isPincodeValid}
                    type="submit"
                  />
                }
                fullWidth
              />
            </form>
          )}
          {summaryQuery?.isError && (
            <ErrorText withBgCard> {summaryQuery?.error?.message} </ErrorText>
          )}
          {subtotal !== undefined && (
            <SummaryRow label="Item Total" value={formatCurrency(subtotal)} />
          )}

          <hr className="border-dashed border-n-400" />
          <SummaryRow
            label="Total MRP (incl. of taxes)"
            value={formatCurrency(totalMrp)}
          />
          {itemDiscount > 0 && (
            <SummaryRow
              label="Item Discount"
              value={`-${formatCurrency(itemDiscount)}`}
              valueClass="font-medium text-success-600"
            />
          )}
          <hr className="border-dashed border-n-400" />

          {charges && charges.length > 0 ? (
            <ChargesSummary charges={charges} />
          ) : (
            validSummary && (
              <SummaryRow
                label="Delivery Charges"
                value="Calculated at checkout"
                valueClass="font-medium text-n-600"
              />
            )
          )}

          {amountToPay !== undefined && (
            <>
              <Divider />
              <div className="flex justify-between">
                <p className="font-semibold text-n-1000">Grand Total</p>
                <h6 className="font-bold text-n-900">
                  {formatCurrency(amountToPay)}
                </h6>
              </div>
            </>
          )}
        </div>

        {/* Add GST Number accordion */}
        {validSummary && (
          <div className="p-4 pt-0">
            {savedGstDetails ? (
              <div>
                <p className="font-medium text-n-800 mb-1">GST Number</p>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-success-300 bg-success-50 px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="size-6 min-w-6">
                      <Image src="/notes-3d-icon.png" alt="coin" eager />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-success-800">
                        {savedGstDetails.businessName}
                      </p>
                      <p className="mt-0.5 text-xs text-success-700">
                        {savedGstDetails.gstin}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearGst}
                    className="shrink-0 text-xs font-semibold text-danger-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={gstToggle.toggle}
                  className="flex w-full items-center justify-between rounded-xl border border-n-400 bg-n-200 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 min-w-6">
                      <Image src="/notes-3d-icon.png" alt="coin" eager />
                    </div>
                    <p className="font-medium text-n-800">Add GST Number</p>
                  </div>
                  <Icon
                    name={gstToggle.isOpen ? "ChevronUp" : "ChevronDown"}
                    size="sm"
                    className="text-n-500"
                  />
                </button>
                <GstSelectorSheet
                  isOpen={gstToggle.isOpen}
                  onClose={gstToggle.close}
                />
              </>
            )}
          </div>
        )}
        <TotalAavakCoinsEarned coins={totalCoins} className="mt-2 mb-4" />

        {/* Continue button — desktop only (mobile uses sticky bar below) */}
        <div className="hidden lg:flex flex-col gap-3 p-4 pt-0">
          {cannotContinue && (
            <ErrorText withBgCard>
              Some items can&apos;t be included in your order. Update or remove
              them to continue.
            </ErrorText>
          )}
          <Button
            variant="filled"
            color="primary"
            size="lg"
            disabled={disableContinue}
            fullWidth
            onClick={handleClick}
          >
            Continue
          </Button>
        </div>

        <ApplyCouponsDialog
          isOpen={applyCouponToggle.isOpen}
          onClose={applyCouponToggle.close}
          params={{ cartId: cart.id }}
          summaryParams={summaryParams}
          onApply={(code) => {
            applyCoupon(code);
            applyCouponToggle.close();
          }}
        />
        <AddAddressDialog
          isOpen={addAddressToggle.isOpen}
          onClose={addAddressToggle.close}
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

      {/* Sticky bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex flex-col gap-3 border-t border-n-300 bg-n-50 p-4 lg:hidden">
        {hasBelowMoqItems && (
          <ErrorText withBgCard>
            Some items don&apos;t meet their minimum order quantity. Update or
            remove them to continue.
          </ErrorText>
        )}
        <Button
          variant="filled"
          color="primary"
          size="lg"
          fullWidth
          disabled={disableContinue}
          onClick={handleClick}
        >
          Continue
        </Button>
      </div>
    </>
  );
}

interface CartSummaryProps {
  cart: Cart;
  summary: ReturnType<typeof useCartSummary>;
}

interface SummaryRowProps {
  label: string;
  value: string;
  labelClass?: string;
  valueClass?: string;
}

function SummaryRow({ label, value, labelClass, valueClass }: SummaryRowProps) {
  return (
    <div className="flex justify-between">
      <p className={`text-sm ${labelClass ?? "text-n-900"}`}>{label}</p>
      <p className={`text-sm ${valueClass ?? "font-semibold text-n-900"}`}>
        {value}
      </p>
    </div>
  );
}
