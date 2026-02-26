import { forwardRef, useId } from "react";
import { Icon } from "@/components/base/icon/Icon";
import { cn } from "@/utils/cssHelpers";
import type { CheckboxProps } from "./checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      wrapperClassName,
      className,
      disabled = false,
      id: providedId,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = providedId ?? generatedId;

    return (
      <div
        className={cn(
          "flex items-center gap-2",
          disabled && "opacity-50",
          wrapperClassName,
        )}
      >
        <div className="relative size-4 shrink-0">
          {/* Hidden native input — accessible + works with RHF register */}
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className={cn(
            "peer absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed",
            className,
          )}
            {...rest}
          />
          {/* Custom visual box */}
          <div
            className={cn(
              "pointer-events-none size-4 rounded transition-colors duration-150",
              "border-2 border-n-600",
              "peer-checked:border-p-500 peer-checked:bg-p-500",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-p-500/30 peer-focus-visible:ring-offset-1",
            )}
          />
          {/* Check icon — visible only when checked */}
          <Icon
            name="Check"
            size="sm"
            strokeWidth={3}
            className="pointer-events-none absolute inset-0 m-auto hidden text-white peer-checked:block"
          />
        </div>

        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              "cursor-pointer text-sm text-n-800",
              disabled && "cursor-not-allowed",
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
