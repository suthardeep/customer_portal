import type { InputHTMLAttributes } from "react";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  wrapperClassName?: string;
}
