import { BaseApiResponse } from "@/types/baseApi.types";

export interface SpotlightProfileStat {
  value: string;
  label: string;
}

export interface SpotlightCurrentStatus {
  name: string;
  badge: string;
}

export interface SpotlightProfile {
  id: string;
  customerId: string;
  name: string;
  profileImageUrl: string;
  email: string;
  bio: string;
  niches: string[];
  instagramUrl: string;
  tikTokUrl: string;
  youtubeUrl: string;
  tier: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  totalViewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SpotlightTierProgress {
  currentTier: string;
  nextTier: string;
}

export type UpdateSpotlightProfileRequest = Pick<
  SpotlightProfile,
  "name" | "email" | "profileImageUrl" | "bio" | "niches" | "instagramUrl" | "youtubeUrl"
>;

export type CreateSpotlightProfileRequest = Pick<
  SpotlightProfile,
  "name" | "email" | "profileImageUrl" | "bio" | "niches" | "instagramUrl" | "youtubeUrl"
>;

export type SpotlightProfileResponse = BaseApiResponse<{
  profile: SpotlightProfile;
  tierProgress: SpotlightTierProgress;
} | null>;
