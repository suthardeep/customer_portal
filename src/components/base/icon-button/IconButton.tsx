import { forwardRef } from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/utils/cssHelpers";
import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
  IconButtonColor,
} from "./iconButton.types";
import Spinner from "@/components/compound/spinner/Spinner";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      className,
      variant = "filled",
      size = "md",
      color = "primary",
      isLoading = false,
      disabled = false,
      type = "button",
      "aria-label": ariaLabel,
      ...restProps
    },
    ref,
  ) => {
    const IconComponent = LucideIcons[icon] as LucideIcons.LucideIcon;

    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant][color],
      squareSizes[size],
      className,
    );

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-disabled={isLoading}
        aria-label={ariaLabel}
        {...restProps}
      >
        <div className={cn("overflow-hidden", contentHeights[size])}>
          <div
            className={cn(
              "transition-all duration-300 ease-in-out",
              isLoading ? "-translate-y-1/2" : "translate-y-0",
            )}
          >
            {/* Icon content */}
            <div
              className={cn(
                "flex items-center justify-center",
                contentHeights[size],
              )}
            >
              <IconComponent size={iconSizes[size]} />
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
                  size={iconSizes[size] - 2}
                  className="stroke-current"
                />
              )}
            </div>
          </div>
        </div>
      </button>
    );
  },
);

IconButton.displayName = "IconButton";

// Square button dimensions
const squareSizes: Record<IconButtonSize, string> = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-9",
};

// Icon sizes matching Button component
const iconSizes: Record<IconButtonSize, number> = {
  xs: 12,
  sm: 14,
  md: 15,
  lg: 20,
};

// Content heights for loading animation
const contentHeights: Record<IconButtonSize, string> = {
  xs: "h-3",
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5",
};

// Base button styles
const baseStyles =
  "inline-flex items-center justify-center transition-[background-color,border-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none rounded-[10px]";

// Variant-color matrix (same as Button, excluding "link")
const variantStyles: Record<
  IconButtonVariant,
  Record<IconButtonColor, string>
> = {
  filled: {
    primary:
      "bg-p-500 text-white hover:bg-p-600 active:bg-p-700 focus-visible:ring-p-500 disabled:bg-p-300 disabled:cursor-not-allowed",
    secondary:
      "bg-s-500 text-white hover:bg-s-600 active:bg-s-700 focus-visible:ring-s-500 disabled:bg-s-300 disabled:cursor-not-allowed",
    neutral:
      "bg-n-700 text-white hover:bg-n-800 active:bg-n-900 focus-visible:ring-n-700 disabled:bg-n-400 disabled:cursor-not-allowed",
    success:
      "bg-success-500 text-white hover:bg-success-600 active:bg-success-700 focus-visible:ring-success-500 disabled:bg-success-300 disabled:cursor-not-allowed",
    danger:
      "bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-700 focus-visible:ring-danger-500 disabled:bg-danger-300 disabled:cursor-not-allowed",
  },
  outline: {
    primary:
      "border-2 border-p-500 text-p-600 hover:bg-p-50 hover:border-p-600 active:bg-p-100 active:border-p-700 focus-visible:ring-p-500 disabled:border-p-300 disabled:text-p-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    secondary:
      "border-2 border-s-500 text-s-600 hover:bg-s-50 hover:border-s-600 active:bg-s-100 active:border-s-700 focus-visible:ring-s-500 disabled:border-s-300 disabled:text-s-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    neutral:
      "border-2 border-n-300 text-n-700 hover:bg-n-50 hover:border-n-400 active:bg-n-100 active:border-n-500 focus-visible:ring-n-500 disabled:border-n-200 disabled:text-n-400 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    success:
      "border-2 border-success-500 text-success-600 hover:bg-success-50 hover:border-success-600 active:bg-success-100 active:border-success-700 focus-visible:ring-success-500 disabled:border-success-300 disabled:text-success-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    danger:
      "border-2 border-danger-500 text-danger-600 hover:bg-danger-50 hover:border-danger-600 active:bg-danger-100 active:border-danger-700 focus-visible:ring-danger-500 disabled:border-danger-300 disabled:text-danger-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  },
  ghost: {
    primary:
      "text-p-600 hover:bg-p-50 active:bg-p-100 focus-visible:ring-p-500 disabled:text-p-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    secondary:
      "text-s-600 hover:bg-s-50 active:bg-s-100 focus-visible:ring-s-500 disabled:text-s-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    neutral:
      "text-n-700 hover:bg-n-100 active:bg-n-200 focus-visible:ring-n-500 disabled:text-n-400 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    success:
      "text-success-600 hover:bg-success-50 active:bg-success-100 focus-visible:ring-success-500 disabled:text-success-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    danger:
      "text-danger-600 hover:bg-danger-50 active:bg-danger-100 focus-visible:ring-danger-500 disabled:text-danger-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
  },
};
