import type { User } from "@/types/user.types";

export type UpdateProfileRequest = Pick<
  User,
  "email" | "fullName" | "profileImageUrl" | "dateOfBirth"
>;
