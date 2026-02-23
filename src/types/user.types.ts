// User type - shared across features
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
