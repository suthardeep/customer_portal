import { forwardRef, useId } from "react";
import { cn } from "@/utils/cssHelpers";
import Label from "../Label";
import type { TextareaProps, TextareaSize } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      fullWidth = false,
      wrapperClassName,
      className,
      labelClassName,
      disabled = false,
      id: providedId,
      required,
      showCount = false,
      customCount,
      maxLength,
      value,
      defaultValue,
      ...restProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = providedId ?? generatedId;

    const hasError = Boolean(error);

    const textareaClasses = cn(
      baseTextareaStyles,
      sizeStyles[size],
      hasError ? stateStyles.error : stateStyles.default,
      disabled && stateStyles.disabled,
      className,
    );

    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
          ? defaultValue.length
          : 0;

    const countLabel =
      customCount ??
      (showCount && maxLength ? `${currentLength}/${maxLength}` : null);

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", wrapperClassName)}>
        {label && (
          <div className="flex items-center gap-0.5">
            <Label
              htmlFor={inputId}
              className={cn(labelStyles, labelSizeStyles[size], labelClassName)}
            >
              {label}
            </Label>
            {required && <span className="text-danger-500 ml-0.5">*</span>}
          </div>
        )}

        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={hasError}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={textareaClasses}
          {...restProps}
        />

        {(error || helperText || countLabel) && (
          <div className="mt-0.5 flex items-start justify-between gap-2">
            <div>
              {(error || helperText) && (
                <p
                  id={error ? `${inputId}-error` : `${inputId}-helper`}
                  className={cn(
                    error ? errorTextStyles : helperTextStyles,
                    helperSizeStyles[size],
                  )}
                >
                  {error || helperText}
                </p>
              )}
            </div>
            {countLabel && (
              <p className={cn("shrink-0 text-n-600", helperSizeStyles[size])}>
                {countLabel}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

const baseTextareaStyles =
  "w-full rounded-xl border text-n-900 placeholder:text-n-700 placeholder:text-sm " +
  "resize-y min-h-[80px] " +
  "transition-[border-color,box-shadow] duration-150 ease-out " +
  "focus:outline-none focus:ring-2 focus:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-700";

const sizeStyles: Record<TextareaSize, string> = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2.5 text-base",
  lg: "px-4 py-3 text-lg",
};

const labelStyles = "mb-1.5 block font-medium text-n-50";

const labelSizeStyles: Record<TextareaSize, string> = {
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

const helperTextStyles = "mt-1.5 text-n-700";
const errorTextStyles = "mt-1.5 text-danger-600";

const helperSizeStyles: Record<TextareaSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

const stateStyles = {
  default: "border-n-500 focus:border-n-600 focus:ring-n-500/20",
  error: "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
  disabled: "border-n-300",
};
