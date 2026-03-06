import { z } from "zod";

export const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().max(100, "Max 100 characters").optional(),
  description: z.string().max(300, "Max 300 characters").optional(),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema> & {
  images?: File[];
};
