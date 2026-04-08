import { Chip } from "@/components/base/chip/Chip";
import { formatCurrency } from "@/utils/formatCurrency";
import { prettyDate } from "@/utils/formatDateTime";
import type { WalletTransaction } from "../types/types";
import { TYPE_CHIP_MAP } from "../utils";

interface TransactionHistoryItemProps {
  transaction: WalletTransaction;
}

export function TransactionHistoryItem({
  transaction,
}: TransactionHistoryItemProps) {
  const isCredit = transaction.direction === "CREDIT";

  const amountDisplay = isCredit
    ? `+${formatCurrency(Math.abs(transaction.amount))}`
    : `-${formatCurrency(Math.abs(transaction.amount))}`;

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 font-medium text-n-1000">
          {transaction.description}
        </p>
        <p className="text-n-800 text-sm mt-1.5">
          {prettyDate(transaction.createdAt, { showTime: true })}
        </p>
        <span className="text-n-800">{transaction.referenceId}</span>
      </div>
      {/* {transaction.type !== TransactionTypeEnum.WITHDRAW && ( */}
      <Chip color={TYPE_CHIP_MAP[transaction.type].color} size="sm">
        {TYPE_CHIP_MAP[transaction.type].label}
      </Chip>
      {/* )} */}
      <p
        className={`shrink-0 font-semibold ${
          isCredit ? "text-success-500" : "text-danger-500"
        }`}
      >
        {amountDisplay}
      </p>
    </div>
  );
}
