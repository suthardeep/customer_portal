import { AavakCoinsChip } from "@/components/base/AavakCoinsChip";
import Dialog from "@/components/base/Dialog";
import { OptionValuesRenderer } from "@/components/base/OptionValuesRenderer";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Image } from "@/components/base/Image";
import { QuantitySelector } from "@/components/base/QuantitySelector";
import { useToggle } from "@/hooks/useToggle";
import { formatCurrency } from "@/utils/formatCurrency";
import { Link } from "@tanstack/react-router";
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
  const image = item.mediaUrls[0];
  const moqRemoveDialog = useToggle();

  const moq = item.minOrderQuantity ?? 1;

  const handleRemove = () => {
    if (moq > 1) {
      moqRemoveDialog.open();
    } else {
      onDelete(item.variantId);
    }
  };

  return (
    <>
      <Dialog
        isOpen={moqRemoveDialog.isOpen}
        onClose={moqRemoveDialog.close}
        size="sm"
        title="Remove from cart?"
        subTitle={`This product has a minimum order quantity of ${moq}. Removing it will delete it from your cart entirely.`}
        actions={{
          secondary: {
            label: "Cancel",
            onClick: moqRemoveDialog.close,
          },
          primary: {
            label: "Remove",
            color: "danger",
            onClick: () => {
              moqRemoveDialog.close();
              onDelete(item.variantId);
            },
          },
        }}
      />
      <div className="flex items-start gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelectChange(item.variantId, e.target.checked)}
          disabled={isUpdating}
          className="mt-1"
        />

        <Link
          to="/products/$productId"
          params={{ productId: item.productId }}
          search={{ variantId: item.variantId }}
          className="size-20 shrink-0 overflow-hidden rounded-xl"
        >
          <Image src={image} alt={item.name} />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/products/$productId"
              params={{ productId: item.productId }}
              search={{ variantId: item.variantId }}
              className="line-clamp-2 font-semibold text-n-900"
            >
              {item.name}
            </Link>
            <IconButton
              icon="X"
              variant="ghost"
              color="neutral"
              onClick={handleRemove}
              disabled={isUpdating}
              aria-label="Remove item"
              className="shrink-0"
            />
          </div>

          <div className="flex md:items-center flex-col md:flex-row gap-2">
            <OptionValuesRenderer optionValues={item.optionValues} />
          </div>

          <div className="flex items-baseline py-2 gap-2">
            <h6 className="font-bold text-n-900">
              {formatCurrency(item.sellingPrice)}
            </h6>
            {item.mrp !== item.sellingPrice && (
              <>
                <p className="text-sm text-n-800 line-through">
                  {formatCurrency(item.mrp)}
                </p>
                {item.discountPercent > 0 ? (
                  <p className="text-sm font-semibold text-success-600">
                    {item.discountPercent}% off
                  </p>
                ) : item.discount ? (
                  <p className="text-sm font-semibold text-success-600">
                    {item.discount} off
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="flex justify-between items-center w-full">
            {(item.totalAavakCoinForUser ?? 0) > 0 && (
              <AavakCoinsChip coins={item.totalAavakCoinForUser} />
            )}
            <div className="ml-auto">
              <QuantitySelector
                value={item.quantity}
                onChange={(q) => onQuantityChange(item.variantId, q)}
                onRemove={handleRemove}
                disabled={isUpdating}
                min={item.minOrderQuantity ?? 1}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
