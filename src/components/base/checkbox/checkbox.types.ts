import type { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Label text rendered next to the checkbox */
  label?: string;
  /** Additional className for the wrapper div */
  wrapperClassName?: string;
}
