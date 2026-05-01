import type { PaginationQueryParams } from "@/types/general.types";

export enum SupportQueryTypeEnum {
  ORDER = "ORDER",
  PAYMENT = "PAYMENT",
  PRODUCT = "PRODUCT",
  ACCOUNT = "ACCOUNT",
  OTHER = "OTHER",
}

export enum SupportTicketStatusEnum {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
}

export interface SupportTicket {
  id: string;
  subject: string;
  queryType: SupportQueryTypeEnum;
  status: SupportTicketStatusEnum;
  message: string;
  attachments: string[];
  orderId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type SupportTicketsQueryParams = PaginationQueryParams & {
  status?: SupportTicketStatusEnum;
};

export interface CreateSupportTicketRequest {
  queryType: SupportQueryTypeEnum;
  subject: string;
  message: string;
  orderId?: string;
  attachments: string[];
}
