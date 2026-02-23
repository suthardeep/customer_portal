import { toast } from "@/utils/toast";
import type { BaseApiErrorResponse } from "@/types/baseApi.types";

export const showErrorToasts = (
  err: BaseApiErrorResponse | any,
  limit?: number,
) => {
  if (Array.isArray(err.message)) {
    const messages = limit ? err.message.slice(0, limit) : err.message;
    messages.forEach((msg: string) => {
      toast.error(msg);
    });
  } else {
    toast.error(err.message || err.error || "Unknown error");
  }
};
