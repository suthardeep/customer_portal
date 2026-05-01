import type { SupportTicketsQueryParams } from "./types/types";

export const supportKeys = {
  all: ["support-tickets"] as const,
  list: (params: SupportTicketsQueryParams) =>
    [...supportKeys.all, "list", params] as const,
};
