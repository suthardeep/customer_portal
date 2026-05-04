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
  bannerImageUrl: string;
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

export interface CreatorStoreProduct {
  productId: string;
  variantId: string;
  name: string;
  brand: { id: string; name: string; brandLogoUrl: string };
  aavakSku: string;
  price: number;
  mrp: number;
  discountPercent: number;
  aavakCoins: number;
  totalAavakCoinForUser: number;
  mediaUrls: string[];
  inStock: boolean;
  affiliateCode: string;
}

export interface CreatorStoreCreator {
  customerId: string;
  name: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  bio: string;
  instagramUrl: string;
  youtubeUrl: string;
  tier: string;
  followerCount: number;
  postCount: number;
}

export interface CreatorStoreData {
  creator: CreatorStoreCreator;
  products: CreatorStoreProduct[];
}

export type CreatorStoreResponse = BaseApiResponse<CreatorStoreData>;
