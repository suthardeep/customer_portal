import InfoItem from "@/components/compound/InfoItem";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatAddress } from "../../my-address/utils";
import { PAYMENT_METHOD_LABEL } from "../constants";
import { OrderItemDetail } from "../types/types";

interface MyOrdersDetailPaymentSectionProps {
  order: OrderItemDetail;
}

export function MyOrdersDetailPaymentSection({
  order: { paymentMethod, totalPrice, shippingAddress },
}: MyOrdersDetailPaymentSectionProps) {
  return (
    <div className="rounded-xl border border-n-400 bg-n-50 p-4 flex flex-col gap-4">
      <h6 className="font-bold text-n-1000">
        Total Order Price: {formatCurrency(totalPrice)}
      </h6>

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
  );
}
