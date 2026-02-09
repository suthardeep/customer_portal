import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { IconName } from "@/components/base/icon/iconRegistry";

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
  startIcon?: IconName;
  endIcon?: IconName;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  color?: ButtonColor;
  startIconClassname?: string;
  endIconClassname?: string;
}
