import { queryOptions } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/types/baseApi.types";
import { supportKeys } from "./supportQueryFactory";
import { getMyTickets } from "./supportService";
import type { SupportTicket, SupportTicketsQueryParams } from "./types/types";

export const supportQueries = {
  list: (params: SupportTicketsQueryParams = {}) =>
    queryOptions({
      queryKey: supportKeys.list(params),
      queryFn: async (): Promise<PaginatedResponse<SupportTicket>> => {
        const response = await getMyTickets({ data: params });
        return response.data;
      },
    }),
};
