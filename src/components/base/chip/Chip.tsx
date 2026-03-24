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
        "inline-flex items-center gap-1 rounded-full font-semibold max-w-fit",
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
  xs: "py-0.5 px-1.5 text-xs",
  sm: "py-1 px-2 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "p-3 text-base",
};

const variantStyles: Record<ChipVariant, Record<ChipColor, string>> = {
  filled: {
    primary: "bg-p-100 text-p-700",
    secondary: "bg-s-50 text-s-700",
    success: "bg-success-100 text-success-700",
    danger: "bg-danger-100 text-danger-700",
    neutral: "bg-n-200 text-n-800",
    blue: "bg-blue-100 text-blue-700",
    skyblue: "bg-sky-100 text-sky-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  },
  outline: {
    primary: "border border-p-300 text-p-700",
    secondary: "border border-(--s-300) text-s-700",
    success: "border border-success-300 text-success-700",
    danger: "border border-danger-300 text-danger-700",
    neutral: "border border-n-300 text-n-800",
    blue: "border border-blue-300 text-blue-700",
    skyblue: "border border-sky-300 text-sky-700",
    purple: "border border-purple-300 text-purple-700",
    orange: "border border-orange-300 text-orange-700",
  },
};
