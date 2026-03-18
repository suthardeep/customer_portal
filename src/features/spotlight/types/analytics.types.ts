import { BaseApiResponse } from "@/types/baseApi.types";

export interface CreatorAnalyticsThresholdMetric {
  current: number;
  required: number;
}

export interface CreatorAnalyticsThresholds {
  completedCampaigns: CreatorAnalyticsThresholdMetric;
  ratingFactor: CreatorAnalyticsThresholdMetric;
  videoPostsPerMonth: CreatorAnalyticsThresholdMetric;
  imagePostsPerMonth: CreatorAnalyticsThresholdMetric;
}

export interface CreatorAnalyticsPostsCreated {
  total: number;
  videoCount: number;
  imageCount: number;
}

export interface CreatorAnalytics {
  currentTier: string;
  currentTierSubtitle: string;
  nextTier: string;
  nextLevelProgress: number;
  thresholds: CreatorAnalyticsThresholds;
  totalViews: number;
  postsCreated: CreatorAnalyticsPostsCreated;
  engagementRate: number;
  engagementRateGrowthPct: number | null;
  aavakCoinsEarned: number;
}

export type CreatorAnalyticsResponse = BaseApiResponse<CreatorAnalytics>;

export interface CreatorTier {
  id: string;
  tier: string;
  subtitle: string;
  requirementPoints: string[];
  benefitPoints: string[];
  sortOrder: number;
  aavakCoins: number;
  videoPostsPerMonth: number;
  imagePostsPerMonth: number;
  minCompletedCampaigns: number;
  minRatingFactor: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreatorTiersResponse = BaseApiResponse<CreatorTier[]>;
