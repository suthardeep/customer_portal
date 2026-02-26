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
    <div className="flex items-center gap-1 bg-p-900 rounded-md">
      <IconButton
        icon="Remove"
        size="sm"
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
        size="sm"
        variant="ghost"
        color="neutral"
        onClick={handleIncrement}
        disabled={isIncrementDisabled}
        aria-label="Increase quantity"
        className="bg-transparent!"
        iconClassName="text-white"
      />
    </div>
  );
}
