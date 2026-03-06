import { Image } from "@/components/base/Image";
import { formatCurrency } from "@/utils/formatCurrency";
import { MyOrdersStatusChip } from "./MyOrdersStatusChip";
import type { OrderItemDetail } from "../types/types";

interface MyOrdersDetailProductSectionProps {
  order: OrderItemDetail;
}

export function MyOrdersDetailProductSection({ order }: MyOrdersDetailProductSectionProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-n-300">
        <Image
          src={order.productImage}
          alt={order.productName}
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="font-medium leading-snug">{order.productName}</p>
        <p className="text-sm text-n-600">Qty: {order.quantity}</p>
        <p className="font-semibold">{formatCurrency(order.itemPrice)}</p>
        <MyOrdersStatusChip status={order.lifecycleStatus} />
      </div>
    </div>
  );
}
