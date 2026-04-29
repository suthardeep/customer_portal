import type { VariantOptionValue } from "@/features/products/types/variant.types";

interface OptionValuesRendererProps {
  optionValues: Pick<VariantOptionValue, "groupName" | "value">[];
}

export function OptionValuesRenderer({ optionValues }: OptionValuesRendererProps) {
  if (optionValues.length === 0) return null;

  return (
    <p className="text-n-800 font-medium">
      {optionValues.map((ov) => `${ov.groupName}: ${ov.value}`).join(" · ")}
    </p>
  );
}
