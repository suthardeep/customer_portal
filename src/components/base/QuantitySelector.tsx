import { PriceDisplay } from "@/features/products/components/PriceDisplay";
import { IconButton } from "./icon-button/IconButton";
import type { IconButtonSize } from "./icon-button/iconButton.types";
import { cn } from "@/utils/cssHelpers";
import { toast } from "@/utils/toast";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  onRemove?: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  currentPrice?: number;
  originalPrice?: number;
  className?: string;
  quantityActionsWrapperClassName?: string;
  iconSize?: IconButtonSize;
}

export function QuantitySelector({
  value,
  onChange,
  onRemove,
  min = 1,
  max = 99,
  disabled = false,
  currentPrice,
  originalPrice,
  className = "",
  quantityActionsWrapperClassName = "",
  iconSize = "sm",
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    } else if (onRemove) {
      onRemove();
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    } else {
      toast.warning(`Only ${max} units available`);
    }
  };

  const isDecrementDisabled = disabled || (value <= min && !onRemove);
  const isIncrementDisabled = disabled;

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      {currentPrice !== undefined && (
        <PriceDisplay
          currentPrice={currentPrice}
          originalPrice={originalPrice}
        />
      )}
      <div
        className={cn(
          "flex items-center gap-1 bg-p-900 rounded-md justify-between",
          quantityActionsWrapperClassName,
        )}
      >
        <IconButton
          icon="Remove"
          size={iconSize}
          variant="ghost"
          color="neutral"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          aria-label="Decrease quantity"
          className="bg-transparent!"
          iconClassName="text-white"
        />
        <p className="text-white font-medium">{value}</p>
        <IconButton
          icon="Add"
          size={iconSize}
          variant="ghost"
          color="neutral"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          aria-label="Increase quantity"
          className="bg-transparent!"
          iconClassName="text-white"
        />
      </div>
    </div>
  );
}
