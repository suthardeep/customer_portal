import { z } from "zod";

export const MAX_CAPTION_LENGTH = 1000;
export const MAX_TAGS = 20;

export const submissionSchema = z.object({
  caption: z.string().max(MAX_CAPTION_LENGTH).optional(),
  tagInput: z.string(),
  tags: z.array(z.string()).max(MAX_TAGS),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;

export const socialLinksSchema = z
  .object({
    instagramShareUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
    youtubeShareUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
    facebookShareUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
  })
  .refine(
    (data) =>
      !!data.instagramShareUrl || !!data.youtubeShareUrl || !!data.facebookShareUrl,
    { message: "At least one social link is required", path: ["instagramShareUrl"] },
  );

export type SocialLinksFormValues = z.infer<typeof socialLinksSchema>;
