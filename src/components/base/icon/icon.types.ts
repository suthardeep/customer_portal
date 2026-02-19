import type { IconName } from "./iconRegistry";

export type IconSize = "xs" | "sm" | "md" | "lg";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  role?: string;
  strokeWidth?: number;
}

export type { IconName };
