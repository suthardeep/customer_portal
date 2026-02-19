import { IconButton } from "./icon-button/IconButton";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const isDecrementDisabled = disabled || value <= min;
  const isIncrementDisabled = disabled || value >= max;

  return (
    <div className="flex items-center gap-2">
      <IconButton
        icon="Remove"
        size="sm"
        variant="outline"
        color="neutral"
        onClick={handleDecrement}
        disabled={isDecrementDisabled}
        aria-label="Decrease quantity"
      />

      <input
        type="text"
        value={value}
        readOnly
        disabled={disabled}
        className="w-12 text-center font-medium text-n-900 bg-transparent border-none focus:outline-none"
        aria-label="Quantity"
      />

      <IconButton
        icon="Add"
        size="sm"
        variant="outline"
        color="neutral"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        aria-label="Increase quantity"
      />
    </div>
  );
}
