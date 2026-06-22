import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Chip } from "@/components/base/chip/Chip";
import { Image } from "@/components/base/Image";
import type { CartItem } from "@/features/cart/types/types";
import { formatCurrency } from "@/utils/formatCurrency";

interface CheckoutItemCardProps {
  item: CartItem;
}

export function CheckoutItemCard({ item }: CheckoutItemCardProps) {
  const image = item.mediaUrls[0];

  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={image} alt={item.name} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="line-clamp-2 font-semibold text-n-900">{item.name}</p>

        <div className="flex items-baseline gap-2">
          <h6 className="font-bold text-n-900">
            {formatCurrency(
              item.quantity > 1 ? item.subtotal : item.sellingPrice,
            )}
          </h6>
          {item.mrp !== item.sellingPrice && (
            <p className="text-sm text-n-800 line-through">
              {formatCurrency(item.mrp * item.quantity)}
            </p>
          )}
          {item.discounts?.label ? (
            <Chip variant="outline" color="success" size="xs">
              {item.discounts.label}
            </Chip>
          ) : item.discountPercent > 0 ? (
            <p className="text-sm font-semibold text-success-600">
              {item.discountPercent}% off
            </p>
          ) : item.discount ? (
            <p className="text-sm font-semibold text-success-600">
              {item.discount} off
            </p>
          ) : null}
        </div>
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
