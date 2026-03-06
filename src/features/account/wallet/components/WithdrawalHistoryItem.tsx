import { Chip } from "@/components/base/chip/Chip";
import { formatCurrency } from "@/utils/formatCurrency";
import { prettyDate } from "@/utils/formatDateTime";
import type { WalletWithdrawal, WithdrawalStatus } from "../types/types";

interface WithdrawalHistoryItemProps {
  withdrawal: WalletWithdrawal;
}

const WITHDRAWAL_STATUS_MAP: Record<
  WithdrawalStatus,
  { label: string; color: "primary" | "secondary" | "neutral" | "danger" | "success" }
> = {
  PROCESSING: { label: "Processing", color: "secondary" },
  CONFIRMED: { label: "Confirmed", color: "success" },
  FAILED: { label: "Failed", color: "danger" },
  CANCELLED: { label: "Cancelled", color: "neutral" },
};

export function WithdrawalHistoryItem({ withdrawal }: WithdrawalHistoryItemProps) {
  const statusConfig = WITHDRAWAL_STATUS_MAP[withdrawal.status];

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 font-medium text-n-1000">
          {withdrawal.bankDetails.accountHolderName}
        </p>
        <p className="text-n-800 text-sm mt-1.5">
          {prettyDate(withdrawal.createdAt, { showTime: true })}
        </p>
        <span className="text-n-800">
          ••••{withdrawal.bankDetails.accountNumber.slice(-4)}
        </span>
      </div>
      <Chip color={statusConfig.color} size="sm">
        {statusConfig.label}
      </Chip>
      <p className="shrink-0 font-semibold text-danger-500">
        -{formatCurrency(Number(withdrawal.amountInr))}
      </p>
    </div>
  );
}
