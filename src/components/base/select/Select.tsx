import * as SelectPrimitive from "@radix-ui/react-select";
import { Icon } from "@/components/base/icon/Icon";
import type { IconSize } from "@/components/base/icon/icon.types";
import { useId } from "react";
import { cn } from "@/utils/cssHelpers";
import type { SelectProps, SelectSize } from "./select.types";
import Label from "../Label";

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

  const triggerStateStyles = hasError
    ? "border-danger-500 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/20"
    : "border-n-400 focus:border-p-500 focus:ring-2 focus:ring-p-500/20";
  // Size-based styles

  return (
    <div className={cn(fullWidth && "w-full", wrapperClassName)}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            "mb-1.5 block font-medium text-n-900",
            helperSizeStyles[size],
            labelClassName,
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </Label>
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
            <Icon
              name="ChevronDown"
              className="transition-transform duration-150 data-[state=open]:rotate-180"
              size={iconSizeToPreset[size]}
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
              <Icon name="ChevronUp" size="md" />
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
                    <Icon name="Check" size="md" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            {/* Scroll Down Button */}
            <SelectPrimitive.ScrollDownButton className={scrollButtonStyles}>
              <Icon name="ChevronDown" size="md" />
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

const iconSizeToPreset: Record<SelectSize, IconSize> = {
  xs: "sm", // 14px → 14px ✓
  sm: "md", // 16px → 16px ✓
  md: "lg", // 18px → 20px (acceptable +2px)
  lg: "lg", // 20px → 20px ✓
};

// Base trigger styles
const triggerBaseStyles =
  "flex w-full items-center justify-between rounded-[10px] border bg-n-50 text-n-900 transition-all duration-150 ease-out outline-none";

// State-based trigger styles

const triggerDisabledStyles =
  "disabled:border-n-300 disabled:bg-n-200 disabled:cursor-not-allowed disabled:text-n-600";

// Content styles
const contentStyles =
  "z-110 max-h-[300px] overflow-hidden rounded-lg border border-n-400 bg-white shadow-md/5 data-[state=open]:animate-popover-show data-[state=closed]:animate-popover-hide";

// Item styles
const itemBaseStyles =
  "relative flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:text-n-400  data-[disabled]:opacity-50 [&_span]:text-sm!";

const itemStateStyles =
  "data-[highlighted]:bg-p-50 data-[state=checked]:bg-p-100 data-[state=checked]:text-p-700 data-[state=checked]:font-medium";

// Scroll button styles
const scrollButtonStyles =
  "flex h-6 cursor-default items-center justify-center bg-white text-n-700 hover:bg-n-50";

// Helper/error text styles
const errorTextStyles = "text-danger-600";
const helperTextStyles = "text-n-700";
