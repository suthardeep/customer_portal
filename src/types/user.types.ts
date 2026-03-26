// User type - shared across features
import { SubscriptionType } from "@/features/account/subscription/types/enums";

export interface User {
  aavakUserId: string;
  phone: string;
  email?: string;
  fullName?: string;
  profileImageUrl?: string;
  dateOfBirth?: string;
  platforms: string[];
  phoneVerified: boolean;
  emailVerified: boolean;
  isActive: boolean;
  deviceId?: string;
  fcmToken?: string;
  hashToken?: string;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  referredByCode: string;
  referralCount: number;
  subscriptionType: SubscriptionType;
}
