import { Select } from "@/components/base/select/Select";
import { useNavigate, useSearch } from "@tanstack/react-router";

const MAX_SELECTABLE_QUANTITY = 10;

interface ProductQuantitySelectorProps {
  max?: number;
}

export function ProductQuantitySelector({ max }: ProductQuantitySelectorProps) {
  const { quantity } = useSearch({ from: "/_public/products/$productId" });
  const navigate = useNavigate();

  const limit = Math.min(
    max ?? MAX_SELECTABLE_QUANTITY,
    MAX_SELECTABLE_QUANTITY,
  );
  const options = Array.from({ length: limit }, (_, i) => ({
    value: String(i + 1),
    label: `Quantity : ${i + 1}`,
  }));

  const handleQuantityChange = (val: string) => {
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, quantity: Number(val) }),
      replace: true,
    });
  };

  return (
    <Select
      options={options}
      value={String(quantity)}
      onValueChange={handleQuantityChange}
    />
  );
}
