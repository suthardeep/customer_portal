import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import { formatCurrency } from "@/utils/formatCurrency";
import type { CartItem } from "../types/types";

interface CartItemCardProps {
  item: CartItem;
  isSelected: boolean;
  onSelectChange: (id: string, checked: boolean) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
}

export function CartItemCard({
  item,
  isSelected,
  onSelectChange,
  onQuantityChange,
  onDelete,
  isUpdating,
}: CartItemCardProps) {
  const image = item.variantImage ?? item.productImage;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <Checkbox
        checked={isSelected}
        onChange={(e) => onSelectChange(item.id, e.target.checked)}
        disabled={isUpdating}
        className="mt-1"
      />

      <div className="size-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={image} alt={item.variantName} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-2 font-semibold text-n-900">
            {item.variantName}
          </p>
          <IconButton
            icon="X"
            variant="ghost"
            color="neutral"
            onClick={() => onDelete(item.id)}
            disabled={isUpdating}
            aria-label="Remove item"
            className="shrink-0"
          />
        </div>

        <div className="flex items-baseline gap-2">
          <h6 className="font-bold text-n-900">
            {formatCurrency(Number(item.sellingPrice))}
          </h6>
          {item.mrp !== item.sellingPrice && (
            <p className="text-sm text-n-800 line-through">
              {formatCurrency(Number(item.mrp))}
            </p>
          )}
        </div>

        {(item.aavakCoinsEarned ?? 0) > 0 && (
          <AavakCoinsChip coins={item.aavakCoinsEarned} />
        )}

        <div className="flex justify-between items-center">
          <p className="text-xs text-n-800">7 Days Returnable</p>
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => onQuantityChange(item.id, q)}
            disabled={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}
