import { ChipColor } from "@/components/base/chip/chip.types";
import { TransactionPoolEnum, TransactionTypeEnum } from "./types/enums";

export const POOL_CHIP_MAP: Record<
  TransactionPoolEnum,
  { label: string; color: ChipColor }
> = {
  [TransactionPoolEnum.EARNED]: { label: "Earned", color: "primary" },
  [TransactionPoolEnum.PURCHASED]: { label: "Purchased", color: "secondary" },
  [TransactionPoolEnum.BOTH]: { label: "Mixed", color: "neutral" },
};

export const TYPE_LABEL_MAP: Record<TransactionTypeEnum, string> = {
  [TransactionTypeEnum.EARN]: "Earn",
  [TransactionTypeEnum.SPEND]: "Spend",
  [TransactionTypeEnum.WITHDRAW]: "Withdraw",
  [TransactionTypeEnum.PURCHASE]: "Purchase",
  [TransactionTypeEnum.EXPIRE]: "Expire",
  [TransactionTypeEnum.REVERSE]: "Reverse",
};

export const TYPE_CHIP_MAP: Record<
  TransactionTypeEnum,
  { label: string; color: ChipColor }
> = {
  [TransactionTypeEnum.EARN]: { label: "Earn", color: "success" },
  [TransactionTypeEnum.SPEND]: { label: "Spend", color: "danger" },
  [TransactionTypeEnum.WITHDRAW]: { label: "Withdraw", color: "orange" },
  [TransactionTypeEnum.PURCHASE]: { label: "Purchase", color: "primary" },
  [TransactionTypeEnum.EXPIRE]: { label: "Expire", color: "neutral" },
  [TransactionTypeEnum.REVERSE]: { label: "Reverse", color: "purple" },
};
