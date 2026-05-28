import { z } from "zod";

export const profileFormSchema = z.object({
  profileImageUrl: z.string().optional(),
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date")
    .refine((val) => new Date(val) <= new Date(), "Date of birth cannot be in the future")
    .optional()
    .or(z.literal("")),
  email: z.string().email(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;
