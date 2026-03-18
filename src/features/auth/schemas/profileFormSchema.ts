import { z } from "zod";

export const profileFormSchema = z.object({
  profileImageUrl: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
