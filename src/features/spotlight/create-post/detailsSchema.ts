import { z } from "zod";
import { MAX_CAPTION_LENGTH, MAX_TAGS } from "./constants";

export const detailsSchema = z.object({
  caption: z.string().max(MAX_CAPTION_LENGTH).optional(),
  tagInput: z.string(),
  tags: z.array(z.string()).max(MAX_TAGS),
});

export type DetailsFormValues = z.infer<typeof detailsSchema>;
