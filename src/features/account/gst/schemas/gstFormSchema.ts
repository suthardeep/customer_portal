import { z } from "zod";

export const gstFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  gstin: z
    .string()
    .length(15, "GSTIN must be exactly 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  billingAddress: z.string().min(1, "Billing address is required"),
  isDefault: z.boolean(),
});

export type GstFormData = z.infer<typeof gstFormSchema>;
