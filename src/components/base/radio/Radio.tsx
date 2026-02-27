import { forwardRef, useId } from "react";
import { cn } from "@/utils/cssHelpers";
import type { RadioProps } from "./radio.types";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    const radioId = providedId ?? generatedId;

    return (
      <div
        className={cn(
          "flex items-center gap-2",
          disabled && "opacity-50",
          wrapperClassName,
        )}
      >
        <div className="relative size-4 shrink-0">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            disabled={disabled}
            className={cn(
              "peer absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed",
              className,
            )}
            {...rest}
          />
          {/* Outer ring */}
          <div
            className={cn(
              "pointer-events-none size-4 rounded-full transition-colors duration-150",
              "border-2 border-n-600",
              "peer-checked:border-p-500",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-p-500/30 peer-focus-visible:ring-offset-1",
            )}
          />
          {/* Inner dot — visible only when checked */}
          <div className="pointer-events-none absolute inset-0 m-auto hidden size-2 rounded-full bg-p-500 peer-checked:block" />
        </div>

        {label && (
          <label
            htmlFor={radioId}
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

Radio.displayName = "Radio";
