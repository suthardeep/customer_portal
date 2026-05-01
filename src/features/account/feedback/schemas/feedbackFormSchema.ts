import { z } from "zod";

export const feedbackFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
