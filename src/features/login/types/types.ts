import { BaseApiResponse } from "@/types/baseApi.types";
import { z } from "zod";
import type { User } from "@/types/user.types";

export const loginFormSchema = z.object({
  mobileNumber: z
    .string()
    .trim()
    .refine((val) => /^[6-9]\d{9}$/.test(val), {
      message: "Mobile number must be exactly 10 digits and start with 6-9",
    }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

const mobileNumberSchema = z
  .string()
  .trim()
  .refine((val) => /^[6-9]\d{9}$/.test(val), {
    message: "Mobile number must be exactly 10 digits and start with 6-9",
  });

export const registerFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name must be at most 50 characters" }),
  mobileNumber: mobileNumberSchema,
  referralCode: z.string().optional(),
  acceptedTerms: z.literal(true, {
    error: "You must accept the terms and conditions",
  }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

// Re-export User type for backward compatibility
export type { User };

// API Request/Response types
export interface SendOtpRequest {
  phone: string;
  userType: "customer";
  isNewUser?: boolean;
}

export interface SendOtpResponse {
  message: string;
  phone: string;
  isNewUser: boolean;
  otpSent: boolean;
  expiresIn: Date;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
  fullName?: string;
  referralCode?: string;
}

export interface ValidateReferralRequest {
  code: string;
}

export type ValidateReferralResponse = BaseApiResponse<{
  valid: boolean;
}>;

export interface VerifyOtpResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
