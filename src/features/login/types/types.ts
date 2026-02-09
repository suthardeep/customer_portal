import { z } from "zod";

export const loginFormSchema = z.object({
  mobileNumber:  z
  .string()
  .refine((val) => /^[6-9]\d{9}$/.test(val), {
    message: "Mobile number must be exactly 10 digits and start with 6-9",
  })
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// User type
export interface User {
  aavakUserId: string;
  phone: string;
  email?: string;
  fullName?: string;
  platforms: string[];
  phoneVerified: boolean;
  emailVerified: boolean;
  isActive: boolean;
  deviceId?: string;
  fcmToken?: string;
  hashToken?: string;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response types
export interface SendOtpRequest {
  phone: string;
  userType: 'customer';
}

export interface SendOtpResponse {
  message: string;
  phone: string;
  isNewUser: boolean;
  expiresIn: Date;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
