import type { ChipColor } from "@/components/base/chip/chip.types";
import {
  SupportQueryTypeEnum,
  SupportTicketStatusEnum,
} from "./types/types";

export const SUPPORT_PAGE_SIZE = 10;

export const TICKET_STATUS_CONFIG: Record<
  SupportTicketStatusEnum,
  { color: ChipColor; label: string }
> = {
  [SupportTicketStatusEnum.OPEN]: { color: "primary", label: "Open" },
  [SupportTicketStatusEnum.IN_PROGRESS]: {
    color: "orange",
    label: "In Progress",
  },
  [SupportTicketStatusEnum.RESOLVED]: { color: "success", label: "Resolved" },
  [SupportTicketStatusEnum.CLOSED]: { color: "neutral", label: "Closed" },
};

export const QUERY_TYPE_CONFIG: Record<
  SupportQueryTypeEnum,
  { label: string }
> = {
  [SupportQueryTypeEnum.ORDER]: { label: "Order" },
  [SupportQueryTypeEnum.PAYMENT]: { label: "Payment" },
  [SupportQueryTypeEnum.PRODUCT]: { label: "Product" },
  [SupportQueryTypeEnum.ACCOUNT]: { label: "Account" },
  [SupportQueryTypeEnum.OTHER]: { label: "Other" },
};

export const QUERY_TYPE_OPTIONS = Object.entries(QUERY_TYPE_CONFIG).map(
  ([value, { label }]) => ({ value, label }),
);
