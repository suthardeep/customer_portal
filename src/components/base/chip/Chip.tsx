import { cn } from "@/utils/cssHelpers";
import type { ChipProps, ChipVariant, ChipColor, ChipSize } from "./chip.types";

export function Chip({
  children,
  variant = "filled",
  color = "primary",
  size = "sm",
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        sizeStyles[size],
        variantStyles[variant][color],
        className,
      )}
    >
      {children}
    </span>
  );
}

const sizeStyles: Record<ChipSize, string> = {
  sm: "p-1 text-xs",
  md: "p-2 text-sm",
  lg: "p-3 text-base",
};

const variantStyles: Record<ChipVariant, Record<ChipColor, string>> = {
  filled: {
    primary: "bg-p-100 text-p-700",
    secondary: "bg-s-50 text-s-700",
    success: "bg-success-100 text-success-700",
    danger: "bg-danger-100 text-danger-700",
    neutral: "bg-n-200 text-n-800",
  },
  outline: {
    primary: "border border-p-300 text-p-700",
    secondary: "border border-s-300 text-s-700",
    success: "border border-success-300 text-success-700",
    danger: "border border-danger-300 text-danger-700",
    neutral: "border border-n-300 text-n-800",
  },
};
