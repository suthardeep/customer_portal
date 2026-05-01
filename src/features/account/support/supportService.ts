import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type {
  CreateSupportTicketRequest,
  SupportTicket,
  SupportTicketsQueryParams,
} from "./types/types";

export const getMyTickets = createServerFn({ method: "GET" })
  .inputValidator((data: SupportTicketsQueryParams) => data)
  .handler(
    async ({
      data,
    }): Promise<BaseApiResponse<PaginatedResponse<SupportTicket>>> => {
      const token = getToken();
      return apiRequest("/v1/support/tickets/my", { params: data, token });
    },
  );

export const createSupportTicket = createServerFn({ method: "POST" })
  .inputValidator((data: CreateSupportTicketRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<SupportTicket>> => {
    const token = getToken();
    return apiRequest("/v1/support/tickets", {
      method: "POST",
      body: data,
      token,
    });
  });
