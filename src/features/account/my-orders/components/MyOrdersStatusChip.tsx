import { Chip } from "@/components/base/chip/Chip";
import type { ChipSize } from "@/components/base/chip/chip.types";
import { ORDER_STATUS_CONFIG } from "../constants";
import type { OrderLifecycleStatus } from "../types/types";
import { getOrderStatusLabel } from "../utils/orderStatusHelpers";

interface MyOrdersStatusChipProps {
  status: OrderLifecycleStatus;
  size?: ChipSize;
}

export function MyOrdersStatusChip({ status, size = "sm" }: MyOrdersStatusChipProps) {
  const config = ORDER_STATUS_CONFIG[status];
  return (
    <Chip variant="filled" color={config.color} size={size}>
      {getOrderStatusLabel(status)}
    </Chip>
  );
}
