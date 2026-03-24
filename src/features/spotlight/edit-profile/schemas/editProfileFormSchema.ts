import { z } from "zod";

export const editProfileFormSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().min(1, "Email is required").check(z.email("Invalid email")),
  profileImageUrl: z.string().min(1, "Profile image is required"),
  bio: z.string().optional(),
  niches: z.array(z.string()).min(1, "Please select at least one niche"),
  instagramUrl: z.string().min(1, "Instagram URL is required").check(z.url("Invalid URL")),
  youtubeUrl: z.string().min(1, "YouTube URL is required").check(z.url("Invalid URL")),
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;
