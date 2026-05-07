import { forwardRef } from "react";
import { Icon } from "@/components/base/icon/Icon";
import type { IconSize } from "@/components/base/icon/icon.types";
import { cn } from "@/utils/cssHelpers";
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonColor,
} from "./button.types";
import Spinner from "@/components/compound/spinner/Spinner";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "filled",
      size = "md",
      startIcon,
      endIcon,
      isLoading = false,
      disabled = false,
      fullWidth = false,
      type = "button",
      color = "primary",
      startIconClassname,
      endIconClassname,
      ...restProps
    },
    ref,
  ) => {
    // Compose button classes
    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant][color],
      sizeStyles[size],
      fullWidth && "w-full",
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-disabled={isLoading}
        {...restProps}
      >
        <div className={cn("overflow-hidden", contentHeights[size])}>
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              isLoading ? "-translate-y-1/2" : "translate-y-0",
            )}
          >
            {/* Normal content */}
            <div
              className={cn(
                "flex items-center justify-center",
                contentHeights[size],
              )}
            >
              {startIcon && (
                <Icon
                  name={startIcon}
                  className={cn(
                    "mr-1.5 text-current",
                    variant === "filled" &&
                      (color === "primary" || color === "danger") &&
                      "text-white",
                    startIconClassname,
                  )}
                  size={iconSizeToPreset[size]}
                />
              )}
              {children}
              {endIcon && (
                <Icon
                  name={endIcon}
                  className={cn("ml-1.5 text-current", endIconClassname)}
                  size={iconSizeToPreset[size]}
                />
              )}
            </div>

            {/* Loading spinner */}
            <div
              className={cn(
                "flex items-center justify-center",
                contentHeights[size],
              )}
            >
              {isLoading && (
                <Spinner
                  className={cn(
                    "stroke-current",
                    variant === "outline" && "stroke-n-800",
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

// Icon size mapping based on button size
const iconSizeToPreset: Record<ButtonSize, IconSize> = {
  xs: "xs", // 12px → 12px ✓
  sm: "sm", // 14px → 14px ✓
  md: "md", // 16px → 16px ✓
  lg: "lg", // 20px → 20px ✓
};

// Content height for slide animation
const contentHeights: Record<ButtonSize, string> = {
  xs: "h-4",
  sm: "h-5",
  md: "h-6",
  lg: "h-7",
};

// Size styles
const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-2 py-0.5 text-xs gap-1",
  sm: "px-3 py-1 text-sm gap-1.5",
  md: "px-3 py-2 text-base gap-2",
  lg: "px-5 py-2.5 text-base gap-2.5",
};

// Variant-color matrix
const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  filled: {
    primary:
      "bg-p-950 text-white hover:bg-p-800 active:bg-p-900 focus-visible:ring-p-500 disabled:bg-n-700 disabled:cursor-not-allowed",
    secondary:
      "bg-s-500 text-white hover:bg-s-600 active:bg-s-700 focus-visible:ring-s-500 disabled:bg-n-700 disabled:cursor-not-allowed",
    neutral:
      "bg-n-700 text-white hover:bg-n-800 active:bg-n-900 focus-visible:ring-n-700 disabled:bg-n-400 disabled:cursor-not-allowed",
    success:
      "bg-success-500 text-white hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500 disabled:bg-success-300 disabled:cursor-not-allowed",
    danger:
      "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 focus-visible:ring-danger-500 disabled:bg-danger-300 disabled:cursor-not-allowed",
  },
  outline: {
    primary:
      "border border-p-950 text-p-950 hover:bg-p-50/40 active:bg-p-100 active:border-p-700 focus-visible:ring-p-500 disabled:border-n-700 disabled:text-n-700 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    secondary:
      "border border-s-500 text-s-600 hover:bg-s-50 hover:border-s-600 active:bg-s-100 active:border-s-700 focus-visible:ring-s-500 disabled:border-n-700 disabled:text-n-700 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    neutral:
      "border border-n-700 text-n-900 hover:border-n-900 active:bg-n-100 active:border-n-500 focus-visible:ring-n-500 disabled:border-n-700 disabled:text-n-700 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    success:
      "border border-success-500 text-success-600 hover:bg-success-50 hover:border-success-600 active:bg-success-100 active:border-success-700 focus-visible:ring-success-500 disabled:border-n-700 disabled:text-n-700 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    danger:
      "border border-danger-500 text-danger-600 hover:bg-danger-50 hover:border-danger-600 active:bg-danger-100 active:border-danger-700 focus-visible:ring-danger-500 disabled:border-n-700 disabled:text-n-700 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  },
  ghost: {
    primary:
      "text-p-600 hover:bg-p-50 active:bg-p-100 focus-visible:ring-p-500 disabled:text-p-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    secondary:
      "text-s-600 hover:bg-s-50 active:bg-s-100 focus-visible:ring-s-500 disabled:text-s-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    neutral:
      "text-n-900 hover:bg-n-300 active:bg-n-200 focus-visible:ring-n-500 disabled:text-n-400 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    success:
      "text-success-600 hover:bg-success-50 active:bg-success-100 focus-visible:ring-success-500 disabled:text-success-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    danger:
      "text-danger-600 hover:bg-danger-50 active:bg-danger-100 focus-visible:ring-danger-500 disabled:text-danger-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  },
  link: {
    primary:
      "text-p-600 hover:underline hover:text-p-700 active:text-p-800 focus-visible:ring-p-500 disabled:text-p-300 disabled:cursor-not-allowed disabled:no-underline",
    secondary:
      "text-s-600 hover:underline hover:text-s-700 active:text-s-800 focus-visible:ring-s-500 disabled:text-s-300 disabled:cursor-not-allowed disabled:no-underline",
    neutral:
      "text-n-700 hover:underline hover:text-n-800 active:text-n-900 focus-visible:ring-n-500 disabled:text-n-400 disabled:cursor-not-allowed disabled:no-underline",
    success:
      "text-success-600 hover:underline hover:text-success-700 active:text-success-800 focus-visible:ring-success-500 disabled:text-success-300 disabled:cursor-not-allowed disabled:no-underline",
    danger:
      "text-danger-600 hover:underline hover:text-danger-700 active:text-danger-800 focus-visible:ring-danger-500 disabled:text-danger-300 disabled:cursor-not-allowed disabled:no-underline",
  },
};

// Base button styles
const baseStyles =
  "inline-flex items-center justify-center font-semibold border border-transparent transition-[background-color,border-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none cursor-pointer rounded-lg";
