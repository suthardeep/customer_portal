import { z } from "zod";

export const RETURN_REASON_VALUES = [
  "Defective or damaged product",
  "Wrong item received",
  "Product not as described",
  "Changed my mind",
  "Other",
] as const;

export type ReturnReason = (typeof RETURN_REASON_VALUES)[number];

export const returnFormSchema = z
  .object({
    reason: z.enum(RETURN_REASON_VALUES, {
      error: "Please select a reason",
    }),
    otherReason: z.string().optional(),
    message: z
      .string()
      .min(10, "Please provide at least 10 characters")
      .max(500, "Message cannot exceed 500 characters"),
    images: z
      .array(z.url())
      .min(1, "Please upload at least one image"),
  })
  .superRefine((data, ctx) => {
    if (data.reason === "Other" && !data.otherReason?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["otherReason"],
        message: "Please describe your reason",
      });
    }
  });

export type ReturnFormData = z.infer<typeof returnFormSchema>;
