import { z } from "zod";

const urlOrEmpty = z.string().url("Invalid URL").or(z.literal(""));

export const editProfileFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  profileImageUrl: z.string().optional(),
  bio: z.string().optional(),
  niches: z.array(z.string()),
  instagramUrl: urlOrEmpty,
  youtubeUrl: urlOrEmpty,
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
