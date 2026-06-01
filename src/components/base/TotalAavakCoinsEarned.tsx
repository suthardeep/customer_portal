import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";

interface TotalAavakCoinsEarnedProps {
  coins: number;
  className?: string;
}

export function TotalAavakCoinsEarned({
  coins,
  className,
}: TotalAavakCoinsEarnedProps) {
  if (coins <= 0) return null;

  return (
    <div
      className={cn(
        "mx-4 flex items-start gap-2 rounded-xl border border-(--s-200) bg-s-50 p-3",
        className,
      )}
    >
      <div className="size-6 min-w-6">
        <Image src="/aavak-coin-v1.png" alt="coin" eager />
      </div>
      <div>
        <p className="text-sm font-semibold text-s-800">
          You're Earning {coins} coins
        </p>
        <p className="mt-0.5 text-xs text-s-600">
          Your {coins} aavak coins unlock exciting discounts and future beauty
          treats!
        </p>
      </div>
    </div>
  );
}
