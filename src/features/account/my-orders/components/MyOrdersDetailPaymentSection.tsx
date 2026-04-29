import InfoItem from "@/components/compound/InfoItem";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatAddress } from "../../my-address/utils";
import { PAYMENT_METHOD_LABEL } from "../constants";
import { OrderItemDetail } from "../types/types";
import { Image } from "@/components/base/Image";

interface MyOrdersDetailPaymentSectionProps {
  order: OrderItemDetail;
}

function PriceRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <p className="text-n-800">{label}</p>
      <p className="text-n-900 font-medium">{value}</p>
    </div>
  );
}

export function MyOrdersDetailPaymentSection({
  order: { paymentMethod, shippingAddress, orderPricing, gstSnapshot },
}: MyOrdersDetailPaymentSectionProps) {
  const hasCoupon = orderPricing.couponDiscount > 0;
  const hasCoins = orderPricing.coinsApplied > 0;

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-n-400 bg-n-50 p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <PriceRow
            label="Item Total (MRP)"
            value={formatCurrency(orderPricing.subtotal)}
          />
          {hasCoupon && (
            <PriceRow
              label={`Coupon Discount${orderPricing.couponCode ? ` (${orderPricing.couponCode})` : ""}`}
              value={`− ${formatCurrency(orderPricing.couponDiscount)}`}
              className="text-success-600"
            />
          )}
          <PriceRow
            label="Shipping Charges"
            value={formatCurrency(orderPricing.shippingCharges)}
          />
          <PriceRow
            label="GST"
            value={formatCurrency(orderPricing.gstAmount)}
          />

          <div className="flex items-center justify-between">
            <span className="font-semibold text-n-1000">Total</span>
            <p className="font-semibold text-n-1000">
              {formatCurrency(orderPricing.totalAmount)}
            </p>
          </div>
          {hasCoins && (
            <div className={`flex items-center justify-between`}>
              <p className="text-n-800">Aavak Coins Applied</p>
              <div className="flex items-center gap-1">
                <p className="text-n-900 font-medium">{`− ${orderPricing.coinsApplied}`}</p>

                <div className="size-4">
                  <Image src="/aavak-coin-v1.png" alt="coin" eager />
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="font-bold text-n-1000">Amount Paid</p>
            <h6 className="font-bold text-p-600">
              {formatCurrency(orderPricing.amountPaid)}
            </h6>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-n-400 bg-n-50 p-4 flex flex-col gap-4">
        <InfoItem
          label="Payment Method"
          value={PAYMENT_METHOD_LABEL[paymentMethod]}
          direction="horizontal"
        />
        <InfoItem
          label="Shipping Address"
          value={formatAddress(shippingAddress)}
        />
        <InfoItem
          label="Receiver's Details"
          value={`${shippingAddress.fullName}, ${shippingAddress.phone}`}
        />
      </div>
      {gstSnapshot && (
        <div className="rounded-xl border border-n-400 bg-n-50 p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-n-900">GST Details</p>
            <InfoItem
              label="GSTIN"
              value={gstSnapshot.gstin}
              direction="horizontal"
            />
            <InfoItem
              label="Business Name"
              value={gstSnapshot.businessName}
              direction="horizontal"
            />
            <InfoItem
              label="Billing Address"
              value={gstSnapshot.billingAddress}
              direction="horizontal"
            />
          </div>
        </div>
      )}
    </div>
  );
}
