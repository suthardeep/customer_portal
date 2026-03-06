import { useState } from "react";
import { cn } from "@/utils/cssHelpers";
import { Icon } from "./icon";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const STAR_COUNT = 5;

const iconSizeMap = {
  sm: "md" as const,
  md: "lg" as const,
  lg: "lg" as const,
};

const customSizeClass = {
  sm: "",
  md: "",
  lg: "size-8",
};

export function StarRatingInput({
  value,
  onChange,
  size = "md",
  disabled = false,
}: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;
  const iconSize = iconSizeMap[size];
  const sizeClass = customSizeClass[size];

  return (
    <div
      role="group"
      aria-label="Star rating"
      className="flex items-center gap-0.5"
    >
      {Array.from({ length: STAR_COUNT }, (_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= displayValue;
        return (
          <button
            key={starValue}
            type="button"
            disabled={disabled}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            aria-pressed={starValue === value}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            className="cursor-pointer disabled:cursor-not-allowed p-0.5 transition-transform hover:scale-110"
          >
            <Icon
              name="Star"
              size={iconSize}
              className={cn(
                sizeClass,
                isFilled
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-yellow-500",
                "transition-colors duration-100",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
