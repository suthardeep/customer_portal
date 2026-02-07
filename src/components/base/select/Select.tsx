import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useId } from "react";
import { cn } from "@/utils/cssHelpers";
import type { SelectProps } from "./select.types";

/**
 * Select component built with Radix UI
 * Supports error and helper text, size variants, and full accessibility
 */
export function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  size = "md",
  fullWidth = true,
  className,
  wrapperClassName,
  labelClassName,
  name,
  defaultValue,
}: SelectProps) {
  const id = useId();
  const hasError = Boolean(error);
  const describedBy = hasError
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  // Size-based styles
  const triggerSizeStyles = {
    xs: "h-7 px-2 py-1 text-xs",
    sm: "h-8 px-2.5 py-1.5 text-sm",
    md: "h-10 px-3 py-2 text-base",
    lg: "h-12 px-4 py-2.5 text-lg",
  };

  const helperSizeStyles = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-sm",
  };

  const iconSizeMap = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
  };

  // Base trigger styles
  const triggerBaseStyles =
    "flex w-full items-center justify-between rounded-[10px] border bg-n-50 text-n-925 transition-all duration-150 ease-out outline-none";

  // State-based trigger styles
  const triggerStateStyles = hasError
    ? "border-danger-500 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20"
    : "border-n-400 focus:border-p-500 focus:ring-2 focus:ring-p-500/20";

  const triggerDisabledStyles =
    "disabled:border-n-300 disabled:bg-n-200 disabled:cursor-not-allowed disabled:text-n-600";

  // Content styles
  const contentStyles =
    "z-50 max-h-[300px] overflow-hidden rounded-lg border border-n-400 bg-white shadow-md/5 data-[state=open]:animate-popover-show data-[state=closed]:animate-popover-hide";

  // Item styles
  const itemBaseStyles =
    "relative flex cursor-pointer items-center justify-between px-3 py-2 text-sm outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:text-n-400 data-[disabled]:opacity-50";

  const itemStateStyles =
    "data-[highlighted]:bg-p-50 data-[state=checked]:bg-p-100 data-[state=checked]:text-p-700 data-[state=checked]:font-medium";

  // Scroll button styles
  const scrollButtonStyles =
    "flex h-6 cursor-default items-center justify-center bg-white text-n-700 hover:bg-n-50";

  // Helper/error text styles
  const errorTextStyles = "text-danger-600";
  const helperTextStyles = "text-n-700";

  return (
    <div className={cn(fullWidth && "w-full", wrapperClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "mb-1.5 block font-medium text-n-925",
            helperSizeStyles[size],
            labelClassName,
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}

      {/* Select Root */}
      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        defaultValue={defaultValue}
      >
        {/* Trigger */}
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={cn(
            triggerBaseStyles,
            triggerSizeStyles[size],
            triggerStateStyles,
            triggerDisabledStyles,
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className="transition-transform duration-150 data-[state=open]:rotate-180"
              size={iconSizeMap[size]}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        {/* Portal and Content */}
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={contentStyles}
            position="popper"
            sideOffset={4}
          >
            {/* Scroll Up Button */}
            <SelectPrimitive.ScrollUpButton className={scrollButtonStyles}>
              <ChevronUp size={16} />
            </SelectPrimitive.ScrollUpButton>

            {/* Viewport */}
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(itemBaseStyles, itemStateStyles)}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check size={16} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            {/* Scroll Down Button */}
            <SelectPrimitive.ScrollDownButton className={scrollButtonStyles}>
              <ChevronDown size={16} />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {/* Error or Helper Text */}
      {(error || helperText) && (
        <p
          id={error ? `${id}-error` : `${id}-helper`}
          className={cn(
            "mt-0.5 text-xs!",
            error ? errorTextStyles : helperTextStyles,
            helperSizeStyles[size],
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}
