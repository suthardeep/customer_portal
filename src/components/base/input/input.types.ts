import type { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "xs" | "sm" | "md" | "lg";
export type InputVariant = "default" | "underline";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text displayed above the input */
  label?: string;

  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string;

  /** Error message (replaces helperText when present, applies error styling) */
  error?: string;

  /** Element rendered on the right side of the input (e.g., icon, button) */
  rightElement?: ReactNode;

  /** Element rendered on the left side of the input (e.g., icon, currency symbol) */
  leftElement?: ReactNode;

  /** When true and type="password", shows eye icon to toggle visibility */
  togglePassword?: boolean;

  /** Input size variant */
  size?: InputSize;

  /** Input visual variant */
  variant?: InputVariant;

  /** Makes input full width of container */
  fullWidth?: boolean;

  /** Additional class name for the wrapper div */
  wrapperClassName?: string;

  /** Additional class name for the label element */
  labelClassName?: string;
}
