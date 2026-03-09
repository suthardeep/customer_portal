import { cn } from "@/utils/cssHelpers";
import { useEffect, useState, type ReactNode } from "react";
import { DialogProps, Drawer } from "vaul";
import { Button } from "../button/Button";
import type { ButtonProps } from "../button/button.types";
import { IconButton } from "../icon-button/IconButton";

const Sheet: React.FC<SheetProps> = (props) => {
  const {
    children,
    isOpen,
    title,
    subTitle,
    onClose,
    actions,
    footer,
    size = "md",
    direction: directionProp,
    disableBackdropClose = false,
    trailingTitleComponent,
    hideCloseIcon = false,
    hideHandle = false,
    customContent,
  } = props;

  const [sheetDirection, setSheetDirection] = useState<DirectionType>("bottom");
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      setSheetDirection("bottom");
    } else {
      setSheetDirection("right");
    }
  }, []);

  const direction = directionProp ?? sheetDirection;
  const isBottom = direction === "bottom";
  const isTop = direction === "top";
  const isLeft = direction === "left";
  const isHorizontal = isBottom || isTop;

  return (
    <Drawer.Root
      direction={direction}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-100 bg-n-900/40 backdrop-blur-[1.5px]" />
        <Drawer.Content
          className={cn(
            "fixed z-101 flex flex-col bg-n-50 border-n-300 overflow-hidden",
            isBottom && "inset-x-0 bottom-0 rounded-t-2xl border-t border-x max-h-[96dvh]",
            isTop && "inset-x-0 top-0 rounded-b-2xl border-b border-x max-h-[96dvh]",
            isLeft && [
              "inset-y-0 left-0 rounded-r-2xl border-r border-y",
              "w-full",
              WIDTH_SIZE_MAP[size],
            ],
            !isHorizontal && !isLeft && [
              "inset-y-0 right-0 rounded-l-2xl border-l border-y",
              "w-full",
              WIDTH_SIZE_MAP[size],
            ],
          )}
          onPointerDownOutside={(e) => {
            if (disableBackdropClose) e.preventDefault();
          }}
        >
          {!hideHandle && isBottom && <Drawer.Handle className="mt-2 mb-0" />}

          {customContent ? children : (
            <>
              <div
                className={cn(
                  "flex shrink-0 items-center gap-1 border-b border-b-n-400",
                  PADDING_CLASS,
                )}
              >
                {title && (
                  <div className="flex mr-auto items-center w-full">
                    <div className="mr-auto flex flex-col">
                      <Drawer.Title className="font-semibold text-n-900 text-base">
                        {title}
                      </Drawer.Title>
                      {subTitle && (
                        <Drawer.Description asChild>
                          <div className="mt-0.5 text-n-700">{subTitle}</div>
                        </Drawer.Description>
                      )}
                    </div>
                    {trailingTitleComponent && trailingTitleComponent}
                  </div>
                )}
                {!hideCloseIcon && (
                  <IconButton
                    icon="X"
                    aria-label="Close sheet"
                    onClick={onClose}
                    size="sm"
                    variant="ghost"
                    color="neutral"
                  />
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="no-scrollbar h-full overflow-y-auto [&>div]:py-4 [&>div]:px-5">
                  {isOpen && children}
                </div>
              </div>

              {(footer || actions) && (
                <div
                  className={cn("shrink-0 border-t border-n-500", PADDING_CLASS)}
                >
                  {footer}
                  {actions && (
                    <div className="flex gap-x-2">
                      {actions.map((action) => (
                        <Button
                          key={action.label}
                          disabled={action.disabled}
                          onClick={action.onClick}
                          startIcon={action.startIcon}
                          endIcon={action.endIcon}
                          size={action.size}
                          variant={action.variant || "filled"}
                          color={action.color || "primary"}
                          className={action.className}
                          isLoading={action.isLoading}
                          fullWidth={action.fullWidth}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {!hideHandle && isTop && <Drawer.Handle className="mb-2 mt-0" />}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

const WIDTH_SIZE_MAP = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-2xl",
};

const PADDING_CLASS = "px-5 py-3";

export default Sheet;

export interface SheetAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  startIcon?: ButtonProps["startIcon"];
  endIcon?: ButtonProps["endIcon"];
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  color?: ButtonProps["color"];
}

export interface SheetProps {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  title?: string;
  subTitle?: ReactNode;
  footer?: ReactNode;
  actions?: SheetAction[];
  disableBackdropClose?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  direction?: DirectionType;
  trailingTitleComponent?: ReactNode;
  hideCloseIcon?: boolean;
  hideHandle?: boolean;
  customContent?: boolean;
}

type DirectionType = DialogProps["direction"];
