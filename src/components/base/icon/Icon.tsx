import { HugeiconsIcon } from "@hugeicons/react";
import { forwardRef } from "react";
import { iconRegistry } from "./iconRegistry";
import type { IconProps, IconSize } from "./icon.types";
import { cn } from "@/utils/cssHelpers";

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    name,
    size = "md",
    className,
    onClick,
    "aria-label": ariaLabel,
    role,
    strokeWidth = 1.5,
  },
  ref,
) {
  const iconComponent = iconRegistry[name];
  const iconSize = SIZE_MAP[size];

  return (
    <HugeiconsIcon
      ref={ref}
      icon={iconComponent}
      size={iconSize}
      className={cn("text-n-900", onClick && "cursor-pointer", className)}
      strokeWidth={strokeWidth}
      onClick={onClick}
      aria-label={ariaLabel}
      role={role}
    />
  );
});

Icon.displayName = "Icon";

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
} as const;
