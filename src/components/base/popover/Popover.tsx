import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/utils/cssHelpers";
import type { PopoverProps } from "./popover.types";

export function Popover({
  trigger,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  className,
  isOpen,
  onOpenChange,
}: PopoverProps) {
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn(
            // Base styles
            "bg-white border border-n-400 rounded-lg shadow-md/5",
            "p-3 max-w-sm",
            "outline-none",
            // Animation
            "animate-popover-show",
            "data-[state=closed]:animate-popover-hide",
            // Z-index
            "z-50",
            // User overrides
            className,
          )}
          collisionPadding={8}
          sticky="always"
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-white" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
