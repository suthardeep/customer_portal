import { toast as sonnerToast } from "sonner";
import { CustomToast } from "@/components/toast/CustomToast";
import type { ToastOptions, ToastType } from "@/components/toast/toast.types";

const showToast = (
  type: ToastType,
  message: string,
  options?: ToastOptions,
) => {
  sonnerToast.custom((t) => (
    <CustomToast
      type={type}
      message={message}
      description={options?.description}
      onClose={() => sonnerToast.dismiss(t)}
      allowDismiss={options?.allowDismiss}
      showIcons={options?.showIcons}
    />
  ));
};

export const toast = {
  success: (msg: string, opts?: ToastOptions) =>
    showToast("success", msg, opts),
  error: (msg: string, opts?: ToastOptions) => showToast("error", msg, opts),
  warning: (msg: string, opts?: ToastOptions) =>
    showToast("warning", msg, opts),
  info: (msg: string, opts?: ToastOptions) => showToast("info", msg, opts),
  default: (msg: string, opts?: ToastOptions) =>
    showToast("default", msg, opts),
};
