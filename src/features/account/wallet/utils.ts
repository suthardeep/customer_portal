import { TransactionPoolEnum } from "./types/enums";

export const POOL_CHIP_MAP: Record<
  TransactionPoolEnum,
  { label: string; color: "primary" | "secondary" | "neutral" }
> = {
  [TransactionPoolEnum.EARNED]: { label: "Earned", color: "primary" },
  [TransactionPoolEnum.PURCHASED]: { label: "Purchased", color: "secondary" },
  [TransactionPoolEnum.BOTH]: { label: "Mixed", color: "neutral" },
};
