import Divider from "@/components/base/Divider";
import { PlaceOrderButton } from "./PlaceOrderButton";
import { Icon } from "@/components/base/icon/Icon";
import { showErrorToasts } from "@/components/toast";
import type { Cart } from "@/features/cart/types/types";
import { openRazorpayCheckout } from "@/lib/razorpayTopUp";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  useInitiatePaymentMutation,
  usePlaceCodOrderMutation,
  useVerifyPaymentMutation,
} from "../checkoutMutations";
import type { CheckoutSession, PaymentMethod } from "../types/types";
import ErrorText from "@/components/base/ErrorText";
import { TotalAavakCoinsEarned } from "@/components/base/TotalAavakCoinsEarned";

interface CheckoutSummaryProps {
  session: CheckoutSession | null;
  isLoading: boolean;
  error: Error | null;
  cart?: Cart;
  paymentMethod: PaymentMethod;
  addressId: string | null;
  isFullyCoveredByCoins: boolean;
}

export function CheckoutSummary({
  session,
  isLoading,
  error,
  cart,
  paymentMethod,
  addressId,
  isFullyCoveredByCoins,
}: CheckoutSummaryProps) {
  const initiatePayment = useInitiatePaymentMutation();
  const verifyPayment = useVerifyPaymentMutation();
  const placeCodOrder = usePlaceCodOrderMutation();

  const totalCoins =
    cart?.items.reduce(
      (acc, item) => acc + item.totalAavakCoinForUser * item.quantity,
      0,
    ) ?? 0;

  const isDisabled =
    !addressId ||
    isLoading ||
    !!error ||
    initiatePayment.isPending ||
    verifyPayment.isPending ||
    placeCodOrder.isPending;

  const handlePlaceOrder = async () => {
    if (!session) return;

    if (paymentMethod === "COD" || isFullyCoveredByCoins) {
      placeCodOrder.mutate(session.id);
      return;
    }

    if (paymentMethod === "PREPAID") {
      try {
        const paymentData = await initiatePayment.mutateAsync(session.id);
        if (!("razorpayOrderId" in paymentData)) return;
        await openRazorpayCheckout({
          order: {
            transactionId: session.id,
            razorpayOrderId: paymentData.razorpayOrderId,
            amount: Number(paymentData.amount),
            currency: paymentData.currency,
            key: paymentData.key,
          },
          description: "Aavak Order Payment",
          onSuccess: async (result) => {
            await verifyPayment.mutateAsync({
              orderId: paymentData.orderId,
              razorpayPaymentId: result.razorpay_payment_id,
              razorpaySignature: result.razorpay_signature,
            });
          },
        });
      } catch (error) {
        showErrorToasts(error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-xl border border-n-400 bg-n-50">
        {/* Price Summary */}
        <div className="flex flex-col gap-3 p-4">
          <p className="font-semibold text-n-900">Price Summary</p>

          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shimmer h-4 rounded" />
              ))}
            </div>
          ) : session ? (
            <>
              <SummaryRow
                label="Items Total"
                value={formatCurrency(session.subtotal)}
              />

              {session.couponDiscount > 0 && (
                <SummaryRow
                  label="Coupon Discount"
                  value={`-${formatCurrency(session.couponDiscount)}`}
                  valueClass="font-medium text-success-600"
                />
              )}

              {session.cgst + session.sgst + session.igst > 0 && (
                <SummaryRow
                  label="GST"
                  value={`+${formatCurrency(session.cgst + session.sgst + session.igst)}`}
                  valueClass="font-medium text-n-900"
                />
              )}

              <SummaryRow
                label="Delivery Charges"
                value={
                  session.shippingCharges === 0
                    ? "Free"
                    : formatCurrency(session.shippingCharges)
                }
                valueClass={
                  session.shippingCharges === 0
                    ? "font-medium text-success-600"
                    : "font-semibold text-n-900"
                }
              />

              {session.handlingCharges > 0 && (
                <SummaryRow
                  label="Handling Charges"
                  value={`+${formatCurrency(session.handlingCharges)}`}
                  valueClass="font-medium text-n-700"
                />
              )}

              {session.packagingCharges > 0 && (
                <SummaryRow
                  label="Packaging Charges"
                  value={`+${formatCurrency(session.packagingCharges)}`}
                  valueClass="font-medium text-n-700"
                />
              )}

              {session.codCharges > 0 && (
                <SummaryRow
                  label="COD Charges"
                  value={`+${formatCurrency(session.codCharges)}`}
                  valueClass="font-medium text-n-700"
                />
              )}
              {session.coinsApplied > 0 && (
                <SummaryRow
                  label="Coins Applied"
                  value={`-${formatCurrency(session.coinsApplied)}`}
                  valueClass="font-medium text-success-600"
                />
              )}
              <Divider />

              <div className="flex justify-between">
                <p className="font-semibold text-n-1000">Total</p>
                <h6 className="font-bold text-n-900">
                  {formatCurrency(session.amountToPay)}
                </h6>
              </div>

              {session.shippingBreakdown && (
                <div className="flex items-center gap-1.5 rounded-lg bg-s-50 px-3 py-2">
                  <Icon
                    name="Truck"
                    size="sm"
                    className="shrink-0 text-s-600"
                  />
                  <p className="text-xs text-s-700">
                    Delivery in {session.shippingBreakdown.estimatedDays} days
                    via {session.shippingBreakdown.provider}
                  </p>
                </div>
              )}
            </>
          ) : error ? (
            <ErrorText withBgCard> {error.message} </ErrorText>
          ) : (
            <p className="text-sm text-n-600">
              Select a delivery address to see pricing
            </p>
          )}
        </div>

        <hr className="border-n-200" />

        {/* Coins earning banner */}
        <TotalAavakCoinsEarned coins={totalCoins} />

        {/* Place Order button — desktop only (mobile uses sticky bar below) */}
        <div className="hidden lg:block p-4 pt-0">
          <PlaceOrderButton
            isDisabled={isDisabled}
            isLoading={
              initiatePayment.isPending ||
              verifyPayment.isPending ||
              placeCodOrder.isPending
            }
            isFullyCoveredByCoins={isFullyCoveredByCoins}
            paymentMethod={paymentMethod}
            amountToPay={session?.amountToPay}
            onClick={handlePlaceOrder}
          />
        </div>
      </div>

      {/* Sticky bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-n-300 bg-n-50 p-4 lg:hidden">
        <PlaceOrderButton
          isDisabled={isDisabled}
          isLoading={
            initiatePayment.isPending ||
            verifyPayment.isPending ||
            placeCodOrder.isPending
          }
          isFullyCoveredByCoins={isFullyCoveredByCoins}
          paymentMethod={paymentMethod}
          amountToPay={session?.amountToPay}
          onClick={handlePlaceOrder}
        />
      </div>
    </>
  );
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
