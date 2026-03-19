import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { CampaignOwnerType, CampaignStatus } from "./enums";
import type { Product } from "@/features/products/types/product.types";

export interface TierBudget {
  budget: number;
  isActive: boolean;
}

export interface TierBudgetConfig {
  INIZIO: TierBudget;
  CREATIVO: TierBudget;
  MAESTRO: TierBudget;
}

export interface Campaign {
  id: string;
  ownerType: CampaignOwnerType;
  ownerId: string;
  name: string;
  description: string;
  image: string | null;
  startDate: string;
  endDate: string;
  campaignBudget: string;
  numberOfInfluencers: number;
  videoDeliverables: number;
  imageDeliverables: number;
  tierBudgets: TierBudgetConfig;
  guidelinePdfUrl: string | null;
  requirements: string[] | null;
  rules: string[] | null;
  status: CampaignStatus;
  budgetDeducted: boolean;
  budgetSpent: string;
  budgetRefunded: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CampaignListItem extends Campaign {
  submissionCount: number;
  creatorCount: number;
}

export interface CampaignListParams {
  currentPage?: number;
  pageSize?: number;
}

export type CampaignListResponse = BaseApiResponse<PaginatedResponse<CampaignListItem>>;

export interface CampaignDetailResponse extends Campaign {
  productIds: string[];
  products: Product[];
  submissionCount: number;
  creatorCount: number;
}

export type CampaignDetailApiResponse = BaseApiResponse<CampaignDetailResponse>;
