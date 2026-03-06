import { cn } from "@/utils/cssHelpers";
import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Button } from "./button/Button";
import type { ButtonProps } from "./button/button.types";
import { IconButton } from "./icon-button/IconButton";

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    children,
    isOpen,
    title,
    subTitle,
    onClose,
    actions,
    size = "md",
    disableBackdropClose = false,
    customContent,
    trialingTitleComponent,
  } = props;

  const defaultContent = (
    <>
      <div className={cn("flex shrink-0 items-center gap-4", PADDING_CLASS)}>
        <div className="mr-auto flex flex-col">
          {title && (
            <RadixDialog.Title className="font-semibold text-n-900 text-lg">
              {title}
            </RadixDialog.Title>
          )}
          {subTitle && (
            <RadixDialog.Description className="mt-0.5 text-n-800">
              {subTitle}
            </RadixDialog.Description>
          )}
        </div>
        {trialingTitleComponent}
        <IconButton
          icon="X"
          aria-label="Close dialog"
          onClick={onClose}
          size="sm"
          variant="ghost"
          color="neutral"
        />
      </div>

      {children && (
        <div className="flex-1 overflow-hidden px-5 py-4">
          <div className="no-scrollbar max-h-[70dvh] overflow-y-auto">
            {children}
          </div>
        </div>
      )}

      {actions && (
        <div className={cn("flex shrink-0 justify-end gap-x-2", PADDING_CLASS)}>
          {actions.tertiary && (
            <Button
              disabled={actions.tertiary.disabled}
              onClick={actions.tertiary.onClick}
              startIcon={actions.tertiary.startIcon}
              endIcon={actions.tertiary.endIcon}
              size={actions.tertiary.size}
              variant={actions.tertiary.variant || "ghost"}
              color={actions.tertiary.color || "neutral"}
              className={actions.tertiary.className}
              isLoading={actions.tertiary.loading}
            >
              {actions.tertiary.label}
            </Button>
          )}
          {actions.secondary && (
            <Button
              disabled={actions.secondary.disabled}
              onClick={actions.secondary.onClick}
              startIcon={actions.secondary.startIcon}
              endIcon={actions.secondary.endIcon}
              size={actions.secondary.size}
              variant={actions.secondary.variant || "ghost"}
              color={actions.secondary.color || "neutral"}
              className={actions.secondary.className}
              isLoading={actions.secondary.loading}
            >
              {actions.secondary.label}
            </Button>
          )}
          {actions.primary && (
            <Button
              disabled={actions.primary.disabled}
              onClick={actions.primary.onClick}
              startIcon={actions.primary.startIcon}
              size={actions.primary.size}
              endIcon={actions.primary.endIcon}
              className={actions.primary.className}
              isLoading={actions.primary.loading}
              variant={actions.primary.variant || "filled"}
              color={actions.primary.color || "primary"}
            >
              {actions.primary.label}
            </Button>
          )}
        </div>
      )}
    </>
  );

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-10 bg-n-900/40 backdrop-blur-[1.5px] data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide" />
        <RadixDialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-11",
            "flex flex-col rounded-2xl border bg-n-50 shadow-xl/5 overflow-hidden",
            "border-n-300 outline-none",
            "data-[state=open]:animate-content-show data-[state=closed]:animate-content-hide",
            SIZE_MAP[size],
          )}
          onPointerDownOutside={(e) => {
            if (disableBackdropClose) e.preventDefault();
          }}
        >
          {customContent ? children : defaultContent}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

const SIZE_MAP = {
  sm: "w-[95%] max-w-lg",
  md: "w-[95%] max-w-2xl",
  lg: "w-[95%] max-w-4xl",
  xl: "w-[95%] max-w-7xl",
  full: "w-[98%]",
};

const PADDING_CLASS = "px-5 py-4";

export default Dialog;

export interface DialogAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  startIcon?: ButtonProps["startIcon"];
  endIcon?: ButtonProps["endIcon"];
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}

export interface DialogActions {
  primary?: DialogAction;
  secondary?: DialogAction;
  tertiary?: DialogAction;
}

export interface DialogProps {
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode;
  title?: string;
  subTitle?: string;
  actions?: DialogActions;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  disableBackdropClose?: boolean;
  customContent?: boolean;
  trialingTitleComponent?: ReactNode;
}
