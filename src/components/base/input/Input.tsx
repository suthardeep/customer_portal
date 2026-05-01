import { forwardRef, useId, useState } from "react";
import { Icon } from "@/components/base/icon/Icon";
import type { IconSize } from "@/components/base/icon/icon.types";
import { cn } from "@/utils/cssHelpers";
import type { InputProps, InputSize, InputVariant } from "./input.types";
import Label from "../Label";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      rightElement,
      leftElement,
      togglePassword = false,
      size = "md",
      variant = "default",
      fullWidth = false,
      wrapperClassName,
      className,
      labelClassName,
      type = "text",
      disabled = false,
      id: providedId,
      required,
      ...restProps
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = providedId ?? generatedId;

    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const actualType = isPasswordType && showPassword ? "text" : type;
    const showToggleButton = togglePassword && isPasswordType;
    const hasError = Boolean(error);
    const hasRightContent = rightElement || showToggleButton;

    const wrapperClasses = cn(
      "flex items-center",
      variantStyles[variant],
      sizeStyles[size],
      hasError
        ? variantStateStyles[variant].error
        : variantStateStyles[variant].default,
      disabled && variantStateStyles[variant].disabled,
    );

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

        <div className={wrapperClasses}>
          {leftElement && (
            <span className="shrink-0 text-n-700">{leftElement}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualType}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={cn(baseInputStyles, className)}
            {...restProps}
          />

          {hasRightContent && (
            <span className="shrink-0">
              {showToggleButton ? (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={cn(
                    "flex items-center justify-center text-n-700",
                    "hover:text-n-900 focus:text-p-600 focus:outline-none",
                    "disabled:pointer-events-none",
                  )}
                  disabled={disabled}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <Icon
                      name="EyeOff"
                      size={iconSizeToPreset[size]}
                      className={size === "md" ? "size-4.5" : undefined}
                    />
                  ) : (
                    <Icon
                      name="Eye"
                      size={iconSizeToPreset[size]}
                      className={size === "md" ? "size-4.5" : undefined}
                    />
                  )}
                </button>
              ) : (
                <span className="text-n-700">{rightElement}</span>
              )}
            </span>
          )}
        </div>

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
    );
  },
);

Input.displayName = "Input";

// Variant styles (on wrapper now)
const variantStyles: Record<InputVariant, string> = {
  default: "rounded-xl border bg-n-50 disabled:bg-n-200",
  underline: "rounded-none border-0 border-b bg-transparent",
};

// Variant-specific state styles (focus-within replaces focus)
const variantStateStyles: Record<
  InputVariant,
  Record<"default" | "error" | "disabled", string>
> = {
  default: {
    default:
      "border-n-500 focus-within:border-n-600 focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-n-500/20",
    error:
      "border-danger-500 focus-within:border-danger-500 focus-within:ring-2 focus-within:ring-offset-0 focus-within:ring-danger-500/20",
    disabled: "border-n-500 bg-n-200",
  },
  underline: {
    default: "border-n-500 focus-within:border-n-600",
    error: "border-danger-500 focus-within:border-danger-500",
    disabled: "border-n-300",
  },
};

// Base input styles — nude, no border, no background
const baseInputStyles =
  "flex-1 min-w-0 bg-transparent border-none outline-none " +
  "text-base text-n-925 placeholder:text-n-600 " +
  "disabled:cursor-not-allowed disabled:text-n-700";

// Size styles on wrapper (padding + text size)
const sizeStyles: Record<InputSize, string> = {
  xs: "gap-1.5 px-2 py-1 text-xs",
  sm: "gap-2 px-2.5 py-1.5 text-sm",
  md: "gap-2.5 px-3 py-2.5 text-base",
  lg: "gap-3 px-4 py-2.5 text-lg",
};

// Icon size mapping for password toggle
const iconSizeToPreset: Record<InputSize, IconSize> = {
  xs: "sm",
  sm: "md",
  md: "lg",
  lg: "lg",
};

// Label styles
const labelStyles = "mb-1.5 block font-medium";

const labelSizeStyles: Record<InputSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
};

// Helper/error text styles
const helperTextStyles = "mt-1.5 text-n-700";
const errorTextStyles = "mt-1.5 text-danger-600";

const helperSizeStyles: Record<InputSize, string> = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};
