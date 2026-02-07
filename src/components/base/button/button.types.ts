import type { ButtonHTMLAttributes, ReactNode } from "react";
import type * as LucideIcons from "lucide-react";

export type ButtonVariant = "filled" | "outline" | "ghost" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "danger";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: keyof typeof LucideIcons;
  endIcon?: keyof typeof LucideIcons;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  color?: ButtonColor;
  startIconClassname?: string;
  endIconClassname?: string;
}
