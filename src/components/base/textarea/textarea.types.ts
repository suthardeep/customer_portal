import type { TextareaHTMLAttributes } from "react";

export type TextareaSize = "sm" | "md" | "lg";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** Label text displayed above the textarea */
  label?: string;

  /** Helper text displayed below the textarea (hidden when error is present) */
  helperText?: string;

  /** Error message (replaces helperText when present, applies error styling) */
  error?: string;

  /** Textarea size variant */
  size?: TextareaSize;

  /** Makes textarea full width of container */
  fullWidth?: boolean;

  /** Additional class name for the wrapper div */
  wrapperClassName?: string;

  /** Additional class name for the label element */
  labelClassName?: string;

  /** Show character count (requires maxLength to be set) */
  showCount?: boolean;

  /** Custom count string rendered in place of the auto count (e.g. "450 remaining") */
  customCount?: string;
}
