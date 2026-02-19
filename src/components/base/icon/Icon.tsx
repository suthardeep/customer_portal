import { HugeiconsIcon } from "@hugeicons/react";
import { iconRegistry } from "./iconRegistry";
import type { IconProps, IconSize } from "./icon.types";

export function Icon({
  name,
  size = "md",
  className,
  onClick,
  "aria-label": ariaLabel,
  role,
  strokeWidth = 1.5,
}: IconProps) {
  const iconComponent = iconRegistry[name];
  const iconSize = SIZE_MAP[size];

  return (
    <HugeiconsIcon
      icon={iconComponent}
      size={iconSize}
      className={className}
      strokeWidth={strokeWidth}
      onClick={onClick}
      aria-label={ariaLabel}
      role={role}
    />
  );
}

Icon.displayName = "Icon";

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
} as const;
