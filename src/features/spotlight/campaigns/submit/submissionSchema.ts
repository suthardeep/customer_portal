import { z } from "zod";

export const MAX_CAPTION_LENGTH = 1000;
export const MAX_TAGS = 20;

export const submissionSchema = z.object({
  caption: z.string().max(MAX_CAPTION_LENGTH).optional(),
  tagInput: z.string(),
  tags: z.array(z.string()).max(MAX_TAGS),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;
