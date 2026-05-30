import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { formatCurrency } from "@/utils/formatCurrency";

interface PriceDisplayProps {
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  savingsAmount?: number;
  earnCoins?: number;
}

export function PriceDisplay({
  currentPrice,
  originalPrice,
  discount,
  savingsAmount,
  earnCoins,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > currentPrice;

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        {/* Current Price */}
        <h4 className="font-bold text-n-900">{formatCurrency(currentPrice)}</h4>

        {/* Original Price (struck through) */}
        {hasDiscount && (
          <p className="text-sm line-through text-n-700">
            {formatCurrency(originalPrice)}
          </p>
        )}

        {/* Discount */}
        {(discount ?? 0) > 0 && (
          <p className="text-sm font-medium text-success-600">
            {discount}% OFF
          </p>
        )}

        {/* Earn Coins Badge */}
        {(earnCoins ?? 0) > 0 && <AavakCoinsChip coins={earnCoins} />}
      </div>

      {/* Savings Amount */}
      {(savingsAmount ?? 0) > 0 && (
        <p className="text-sm font-medium text-success-600">
          You save {formatCurrency(savingsAmount!)}
        </p>
      )}
    </div>
  );
}
