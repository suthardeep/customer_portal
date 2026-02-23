export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastOptions {
  description?: string;
  allowDismiss?: boolean;
  showIcons?: boolean;
}

export interface CustomToastProps {
  type: ToastType;
  message: string;
  description?: string;
  onClose: () => void;
  allowDismiss?: boolean;
  showIcons?: boolean;
}
