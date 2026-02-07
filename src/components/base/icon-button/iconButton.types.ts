import type { ButtonHTMLAttributes } from "react";
import type * as LucideIcons from "lucide-react";

export type IconButtonVariant = "filled" | "outline" | "ghost";
export type IconButtonSize = "xs" | "sm" | "md" | "lg";
export type IconButtonColor =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "danger";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Lucide icon name (e.g., "Plus", "X", "ChevronDown") */
  icon: keyof typeof LucideIcons;
  /** Required for accessibility - describes the button action */
  "aria-label": string;
  /** Visual style variant */
  variant?: IconButtonVariant;
  /** Button size - determines square dimensions */
  size?: IconButtonSize;
  /** Color theme */
  color?: IconButtonColor;
  /** Shows loading spinner instead of icon */
  isLoading?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Button type attribute */
  type?: "button" | "submit" | "reset";
  /** Additional CSS classes */
  className?: string;
}
