import type { User } from "@/types/user.types";

export type UpdateProfileRequest = Pick<
  User,
  "fullName" | "profileImageUrl" | "dateOfBirth" | "email"
>;

export interface RequestEmailOtpRequest {
  email: string;
}

export interface VerifyEmailOtpRequest {
  email: string;
  otp: string;
}
