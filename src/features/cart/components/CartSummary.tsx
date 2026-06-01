import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon/Icon";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Cart } from "../types/types";
import { Image } from "@/components/base/Image";
import Divider from "@/components/base/Divider";
import ApplyCouponsDialog from "./ApplyCouponsDialog";
import { TaxBreakdown } from "./TaxBreakdown";
import { useLoginDialog } from "@/features/auth/hooks/useLoginDialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import GstSelectorSheet from "@/features/account/gst/components/GstSelectorSheet";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { useQuery } from "@tanstack/react-query";
import { addressQueries } from "@/features/account/my-address/addressQueries";
import { cartQueries } from "../cartQueries";
import { useSelectedAddressStore } from "@/features/account/my-address/stores/selectedAddressStore";
import { useCreateAddressMutation } from "@/features/account/my-address/addressMutations";
import AddAddressDialog from "@/features/account/my-address/components/AddAddressDialog";
import { stripIndianCountryCode } from "@/utils/stringHelpers";
import type { AddressFormData } from "@/features/account/my-address/types/types";
import { Input } from "@/components/base/input/Input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { CartSummarySkeleton } from "./skeletons/CartSkeleton";
import ErrorText from "@/components/base/ErrorText";
import { TotalAavakCoinsEarned } from "@/components/base/TotalAavakCoinsEarned";

const pincodeSchema = z.object({
  pincode: z
    .string()
    .length(6, "Enter a valid 6-digit pincode")
    .regex(/^\d+$/, "Digits only"),
});
type PincodeFormData = z.infer<typeof pincodeSchema>;

export function CartSummary({ cart }: CartSummaryProps) {
  const gstToggle = useToggle();
  const applyCouponToggle = useToggle();
  const addAddressToggle = useToggle();
  const {
    savedGstDetails,
    gstDetailsId,
    clearGst,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCheckoutStore();
  const loginDialog = useLoginDialog();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const navigate = useNavigate();
  const { data: addressList, isLoading: isAddressLoading } = useQuery({
    ...addressQueries.list(),
    enabled: isAuthenticated,
  });
  const { activeAddress, selectSavedAddress } = useSelectedAddressStore();
  const createAddress = useCreateAddressMutation();

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
  };

  const authAndAddressReady =
    !isAuthLoading && (!isAuthenticated || !isAddressLoading);

  const summaryQuery = useQuery({
    ...cartQueries.summary(summaryParams),
    enabled: !!activeAddress?.id || !!effectivePincode,
    refetchOnWindowFocus: false,
  });

  if (!authAndAddressReady || summaryQuery.isLoading)
    return <CartSummarySkeleton />;

  const summary = summaryQuery.data;

  const hasNoSavedAddresses = !addressList?.length;

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
  const shippingCharges = summary?.shippingCharges;
  const couponDiscount = summary?.couponDiscount;
  const cgst = summary?.cgst;
  const sgst = summary?.sgst;
  const igst = summary?.igst;
  const codCharges = summary?.codCharges;
  const handlingCharges = summary?.handlingCharges;
  const packagingCharges = summary?.packagingCharges;
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

  const disableContinue = summaryQuery?.isError || summaryQuery?.isLoading;
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
              onSubmit={handleSubmit((data) =>
                setConfirmedPincode(data.pincode),
              )}
              className="flex items-center gap-2"
            >
              <Input
                {...register("pincode")}
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
                    disabled={!isValid}
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

          {couponDiscount !== undefined && couponDiscount > 0 && (
            <SummaryRow
              label={`Coupon Discount (${couponCode})`}
              value={`-${formatCurrency(couponDiscount)}`}
              valueClass="font-medium text-success-600"
            />
          )}

          {validSummary && (
            <SummaryRow
              label="Delivery Charges"
              value={
                shippingCharges !== undefined
                  ? formatCurrency(shippingCharges)
                  : "Calculated at checkout"
              }
              valueClass={
                shippingCharges !== undefined
                  ? "font-semibold text-n-900"
                  : "font-medium text-n-600"
              }
            />
          )}

          <TaxBreakdown cgst={cgst ?? 0} sgst={sgst ?? 0} igst={igst ?? 0} />
          {codCharges !== undefined && codCharges > 0 && (
            <SummaryRow
              label="COD Charges"
              value={formatCurrency(codCharges)}
            />
          )}
          {handlingCharges !== undefined && handlingCharges > 0 && (
            <SummaryRow
              label="Handling Charges"
              value={formatCurrency(handlingCharges)}
            />
          )}
          {packagingCharges !== undefined && packagingCharges > 0 && (
            <SummaryRow
              label="Packaging Charges"
              value={formatCurrency(packagingCharges)}
            />
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
        <div className="hidden lg:block p-4 pt-0">
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
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-n-300 bg-n-50 p-4 lg:hidden">
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
      <p className={`text-sm ${labelClass ?? "text-n-800"}`}>{label}</p>
      <p className={`text-sm ${valueClass ?? "font-semibold text-n-900"}`}>
        {value}
      </p>
    </div>
  );
}
