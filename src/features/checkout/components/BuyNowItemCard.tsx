import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Chip } from "@/components/base/chip/Chip";
import { OptionValuesRenderer } from "@/components/base/OptionValuesRenderer";
import { Image } from "@/components/base/Image";
import type { BuyNowItem } from "@/features/checkout/types/types";
import { formatCurrency } from "@/utils/formatCurrency";

interface BuyNowItemCardProps {
  item: BuyNowItem;
}

export function BuyNowItemCard({ item }: BuyNowItemCardProps) {
  const image = item.mediaUrls[0];
  const subtotal = item.sellingPrice * item.quantity;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={image} alt={item.name} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="line-clamp-2 font-semibold text-n-900">{item.name}</p>

        <div className="flex items-baseline gap-2">
          <h6 className="font-bold text-n-900">
            {formatCurrency(item.quantity > 1 ? subtotal : item.sellingPrice)}
          </h6>
          {item.mrp !== item.sellingPrice && (
            <p className="text-sm text-n-800 line-through">
              {formatCurrency(item.mrp * item.quantity)}
            </p>
          )}
          {item.discountPercent > 0 ? (
            <Chip variant="outline" color="success" size="xs">
              {item.discountPercent}% off
            </Chip>
          ) : item.discount ? (
            <Chip variant="outline" color="success" size="xs">
              {item.discount} off
            </Chip>
          ) : null}
        </div>
        <OptionValuesRenderer optionValues={item.optionValues} />
        <div className="flex items-center gap-2">
          <p className="text-sm text-n-800">
            {item.quantity > 1
              ? `${item.quantity} × ${formatCurrency(item.sellingPrice)}`
              : `Qty: 1`}
          </p>

          {(item.totalAavakCoinForUser ?? 0) > 0 && (
            <AavakCoinsChip coins={item.totalAavakCoinForUser} />
          )}
        </div>
      </div>
    </div>
  );
}
