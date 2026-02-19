import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Chip } from "@/components/base/chip/Chip";
import { formatCurrency } from "@/utils/formatCurrency";

interface PriceDisplayProps {
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  earnCoins?: number;
}

export function PriceDisplay({
  currentPrice,
  originalPrice,
  discount,
  earnCoins,
}: PriceDisplayProps) {
  const hasDiscount = originalPrice && originalPrice > currentPrice;

  return (
    <div className="flex flex-wrap items-end gap-2">
      {/* Current Price */}
      <h4 className="font-bold text-n-900">{formatCurrency(currentPrice)}</h4>

      {/* Original Price (struck through) */}
      {hasDiscount && (
        <p className="text-sm line-through text-n-700">
          {formatCurrency(originalPrice)}
        </p>
      )}

      {/* Discount Badge */}
      {(discount ?? 0) > 0 && (
        <Chip variant="filled" color="success" size="sm">
          {discount}% OFF
        </Chip>
      )}

      {/* Earn Coins Badge */}
      {(earnCoins ?? 0) > 0 && <AavakCoinsChip coins={earnCoins} />}
    </div>
  );
}
