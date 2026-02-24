import { Image } from "@/components/base/Image";
import { cn } from "@/utils/cssHelpers";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { ProductVariant } from "../types";
import type { VariantAttribute, VariantAttributeValue } from "../types/types";

interface ProductVariantSelectorProps {
  variantAttributes: VariantAttribute[];
  variants: ProductVariant[];
}

function isValueUnavailable(
  attributeName: string,
  attributeValue: string,
  variants: ProductVariant[],
  selectedAttributes: Record<string, string>,
): boolean {
  const candidateAttributes = {
    ...selectedAttributes,
    [attributeName]: attributeValue,
  };
  return !variants.some((variant) => {
    const matchesCandidate = Object.entries(candidateAttributes).every(
      ([name, value]) => variant.combination[name] === value,
    );
    const hasStock = variant?.inStock && (variant.quantity ?? 0) > 0;
    return matchesCandidate && hasStock;
  });
}

interface ChipProps {
  attrValue: VariantAttributeValue;
  isSelected: boolean;
  isUnavailable: boolean;
  onClick: () => void;
}

function LabelChip({
  attrValue,
  isSelected,
  isUnavailable,
  onClick,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`Select ${attrValue.label}`}
      className={cn(
        "relative px-3 py-1.5 rounded-lg border-2 font-medium transition-all capitalize cursor-pointer",
        isSelected && "border-p-500 bg-p-50 text-p-800",
        !isSelected &&
          !isUnavailable &&
          "border-n-400 text-n-900 hover:border-n-600",
        !isSelected && isUnavailable && "opacity-60 border-n-600 text-n-800",
        isSelected && isUnavailable && "opacity-60",
      )}
    >
      {isUnavailable && (
        <span
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
          aria-hidden="true"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              className="text-n-600"
            />
          </svg>
        </span>
      )}
      <p>{attrValue.label}</p>
    </button>
  );
}

function ImageChip({
  attrValue,
  isSelected,
  isUnavailable,
  onClick,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`Select ${attrValue.label}`}
      className={cn(
        "flex flex-col items-center gap-1 transition-all",
        isUnavailable && "opacity-60",
      )}
    >
      <div
        className={cn(
          "relative size-16 rounded-lg border-2 overflow-hidden",
          isSelected && "border-p-500",
          !isSelected && !isUnavailable && "border-n-300 hover:border-n-400",
          !isSelected && isUnavailable && "border-n-300",
        )}
      >
        <Image
          src={attrValue?.image}
          alt={attrValue.label}
          className="size-full object-cover"
        />
        {isUnavailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="text-xs font-medium text-danger-600">
              Sold out
            </span>
          </div>
        )}
      </div>
      <span className="w-full text-center text-wrap text-n-800 truncate">
        {attrValue.label}
      </span>
    </button>
  );
}

interface AttributeGroupProps {
  attribute: VariantAttribute;
  variants: ProductVariant[];
  selectedAttributes: Record<string, string>;
  onAttributeChange: (name: string, value: string) => void;
}

function AttributeGroup({
  attribute,
  variants,
  selectedAttributes,
  onAttributeChange,
}: AttributeGroupProps) {
  const selectedValue = selectedAttributes[attribute.name];
  const selectedLabel = attribute.values.find(
    (v) => v.value === selectedValue,
  )?.label;

  return (
    <div className="space-y-2">
      <p className="font-medium text-n-950">
        {attribute.label}
        {selectedLabel && (
          <span className="ml-1 text-sm capitalize text-p-800 font-semibold">
            : {selectedLabel}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        {attribute.values.map((attrValue) => {
          const isSelected = selectedValue === attrValue.value;
          const isUnavailable = isValueUnavailable(
            attribute.name,
            attrValue.value,
            variants,
            selectedAttributes,
          );

          if (attribute.displayImage) {
            return (
              <ImageChip
                key={attrValue.value}
                attrValue={attrValue}
                isSelected={isSelected}
                isUnavailable={isUnavailable}
                onClick={() =>
                  onAttributeChange(attribute.name, attrValue.value)
                }
              />
            );
          }

          return (
            <LabelChip
              key={attrValue.value}
              attrValue={attrValue}
              isSelected={isSelected}
              isUnavailable={isUnavailable}
              onClick={() => onAttributeChange(attribute.name, attrValue.value)}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ProductVariantSelector({
  variantAttributes,
  variants,
}: ProductVariantSelectorProps) {
  const { variantId } = useSearch({
    from: "/_public/product/$productId",
  });
  const navigate = useNavigate();

  if (!variantAttributes || variantAttributes.length === 0) return null;

  const selectedVariant =
    variants.find((v) => v.id === variantId) ?? variants[0];
  const selectedAttributes = selectedVariant?.combination ?? {};

  const handleAttributeChange = (name: string, value: string) => {
    const newAttributes = { ...selectedAttributes, [name]: value };
    const matchedVariant = variants.find((v) =>
      Object.entries(newAttributes).every(
        ([attrName, attrValue]) => v.combination[attrName] === attrValue,
      ),
    );

    navigate({
      to: ".",
      search: (prev) => ({
        ...prev,
        variantId: matchedVariant?.id,
      }),
      replace: true,
    });
  };

  return (
    <div className="space-y-5">
      {variantAttributes.map((attribute) => (
        <AttributeGroup
          key={attribute.name}
          attribute={attribute}
          variants={variants}
          selectedAttributes={selectedAttributes}
          onAttributeChange={handleAttributeChange}
        />
      ))}
    </div>
  );
}
