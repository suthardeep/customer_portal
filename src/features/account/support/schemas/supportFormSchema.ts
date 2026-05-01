import { z } from "zod";
import { SupportQueryTypeEnum } from "../types/types";

export const supportFormSchema = z.object({
  queryType: z.nativeEnum(SupportQueryTypeEnum, {
    message: "Please select a query type",
  }),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be at most 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
  orderId: z.string().optional(),
  attachments: z.array(z.string()),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;
