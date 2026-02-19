import { forwardRef, useId, useState } from "react";
import { Icon } from "@/components/base/icon/Icon";
import type { IconSize } from "@/components/base/icon/icon.types";
import { cn } from "@/utils/cssHelpers";
import type { InputProps, InputSize } from "./input.types";

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
      fullWidth = false,
      wrapperClassName,
      className,
      labelClassName,
      type = "text",
      disabled = false,
      id: providedId,
      ...restProps
    },
    ref,
  ) => {
    // Generate unique ID for label association, allow override
    const generatedId = useId();
    const inputId = providedId ?? generatedId;

    // Password visibility state (only used when togglePassword is true)
    const [showPassword, setShowPassword] = useState(false);

    // Determine actual input type
    const isPasswordType = type === "password";
    const actualType = isPasswordType && showPassword ? "text" : type;

    // Determine if we should show the toggle button
    const showToggleButton = togglePassword && isPasswordType;

    // Determine state for styling
    const hasError = Boolean(error);

    // Check if we have right-side content
    const hasRightContent = rightElement || showToggleButton;

    // Compose input classes
    const inputClasses = cn(
      baseInputStyles,
      sizeStyles[size],
      hasError ? stateStyles.error : stateStyles.default,
      disabled && stateStyles.disabled,
      leftElement && leftPaddingStyles[size],
      hasRightContent && rightPaddingStyles[size],
      className,
    );

    return (
      <div className={cn(fullWidth ? "w-full" : "w-fit", wrapperClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(labelStyles, labelSizeStyles[size], labelClassName)}
          >
            {label}
          </label>
        )}

        {/* Input container with absolute positioned elements */}
        <div className="relative">
          {/* Left element */}
          {leftElement && (
            <div
              className={cn(
                "pointer-events-none absolute left-0 top-0 flex items-center justify-center text-n-700",
                iconContainerStyles[size],
                iconContainerWidths[size],
              )}
            >
              <span className="pointer-events-auto">{leftElement}</span>
            </div>
          )}

          {/* Input element */}
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
            className={inputClasses}
            {...restProps}
          />

          {/* Right element OR password toggle */}
          {hasRightContent && (
            <div
              className={cn(
                "absolute right-0 top-0 flex items-center justify-center",
                iconContainerStyles[size],
                iconContainerWidths[size],
              )}
            >
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
                <span className="pointer-events-auto text-n-700">
                  {rightElement}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Helper text or error message */}
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

// Base input styles
const baseInputStyles =
  "w-full rounded-xl border bg-n-50 text-n-925 placeholder:text-n-600 " +
  "transition-[border-color,box-shadow] duration-150 ease-out " +
  "focus:outline-none focus:ring-2 focus:ring-offset-0 " +
  "disabled:cursor-not-allowed disabled:bg-n-200 disabled:text-n-700";

// Size styles
const sizeStyles: Record<InputSize, string> = {
  xs: "px-2 py-1 text-xs ",
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2.5 text-base",
  lg: "px-4 py-2.5 text-lg",
};

// Left padding adjustments for left element
const leftPaddingStyles: Record<InputSize, string> = {
  xs: "pl-7",
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-12",
};

// Right padding adjustments for right element / password toggle
const rightPaddingStyles: Record<InputSize, string> = {
  xs: "pr-7",
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-12",
};

// Icon container heights (match input heights)
const iconContainerStyles: Record<InputSize, string> = {
  xs: "h-7",
  sm: "h-8",
  md: "h-11",
  lg: "h-12",
};

// Icon container widths
const iconContainerWidths: Record<InputSize, string> = {
  xs: "w-7",
  sm: "w-8",
  md: "w-10",
  lg: "w-12",
};

// Icon size mapping for password toggle
const iconSizeToPreset: Record<InputSize, IconSize> = {
  xs: "sm", // 14px → 14px ✓
  sm: "md", // 16px → 16px ✓
  md: "lg", // 18px → 20px (override with className size-4.5)
  lg: "lg", // 20px → 20px ✓
};

// Label styles
const labelStyles = "mb-1.5 block font-medium text-n-850";

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

// State-based border/ring styles
const stateStyles = {
  default: "border-n-500 focus:border-n-600 focus:ring-n-500/20",
  error: "border-danger-500 focus:border-danger-500 focus:ring-danger-500/20",
  disabled: "border-n-300",
};
