import { Image } from "@/components/base/Image";
import { walletQueries } from "@/features/account/wallet/walletQueries";
import { formatDecimal } from "@/utils/prettyNumber";
import { useQuery } from "@tanstack/react-query";

interface AavakCoinsApplyProps {
  isApplied: boolean;
  amountToPay: number;
  coinsApplied?: number;
  onApply: (coins: number) => void;
  onRemove: () => void;
}

export function AavakCoinsApply({
  isApplied,
  amountToPay,
  coinsApplied,
  onApply,
  onRemove,
}: AavakCoinsApplyProps) {
  const { data: balance, isLoading } = useQuery(walletQueries.balance());

  if (isLoading) {
    return <div className="shimmer h-18 rounded-xl" />;
  }

  if (!balance?.totalBalance) return null;

  const { totalBalance } = balance;
  const coinsToDeduct = Math.min(totalBalance, amountToPay);

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
        isApplied ? "border-p-400 bg-p-50" : "border-n-400 bg-n-50/20"
      }`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
          isApplied ? "bg-p-100" : "bg-n-200"
        }`}
      >
        <div className="size-5">
          <Image src="/aavak-coin-v1.png" alt="coin" eager />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p
            className={`font-semibold ${isApplied ? "text-p-900" : "text-n-900"}`}
          >
            Aavak Coins
          </p>
        </div>
        {isApplied && coinsApplied !== undefined ? (
          <p className="mt-0.5 text-sm text-n-900">
            <span className="font-semibold text-sm">
              {formatDecimal(coinsApplied)}{" "}
            </span>
            out of {formatDecimal(totalBalance)} coins will be deducted
          </p>
        ) : (
          <p className="mt-0.5 text-sm text-n-900">
            Use your coins to get a discount
          </p>
        )}
      </div>

      <button
        onClick={() => (isApplied ? onRemove() : onApply(coinsToDeduct))}
        disabled={!isApplied && amountToPay === 0}
        className={`shrink-0 text-sm font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
          isApplied
            ? "text-danger-600 hover:underline"
            : "text-p-600 hover:underline"
        }`}
      >
        {isApplied ? "Remove" : "Apply"}
      </button>
    </div>
  );
}
