import type { BaseApiResponse, PaginatedResponse } from "@/types/baseApi.types";
import type { UgcPostType } from "@/features/spotlight/types/enums";
import type { Product } from "@/features/products/types/product.types";
import type { CampaignSubmissionStatus } from "./enums";

export interface CreateCampaignSubmissionRequest {
  type: UgcPostType;
  videoFileId?: string;
  imageFileIds?: string[];
  images?: string[];
  caption?: string;
  tags?: string[];
  productIds: string[];
}

export interface SubmissionPostStats {
  views: number;
  likes: number;
  bookmarks: number;
  shares: number;
}

export interface SubmissionMediaVariant {
  url: string;
  size: number;
  bitrate: number;
  quality: string;
}

export interface SubmissionPostMedia {
  status: string;
  thumbnail: string | null;
  playUrl: string | null;
  hlsUrl: string | null;
  images: string[] | null;
  variants: SubmissionMediaVariant[] | null;
  thumbnails: string[] | null;
  duration: number | null;
  dimensions: { width: number; height: number } | null;
}

export interface SubmissionPost {
  id: string;
  type: UgcPostType;
  title: string | null;
  caption: string | null;
  tags: string[];
  status: string;
  stats: SubmissionPostStats;
  media: SubmissionPostMedia;
}

export interface SubmissionCreator {
  id: string;
  fullName: string;
  profileImage: string | null;
}

export interface CampaignSubmission {
  id: string;
  campaignId: string;
  customerId: string;
  productIds: string[];
  ugcPostId: string;
  status: CampaignSubmissionStatus;
  reviewTitle: string | null;
  reviewDescription: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  facebookUrl: string | null;
  linksSubmittedAt: string | null;
  rewardPaid: boolean;
  rewardAmount: string | null;
  rewardPaidAt: string | null;
  rewardTransactionId: string | null;
  createdAt: string;
  updatedAt: string;
  post: SubmissionPost;
  products: Product[];
  creatorTier: string;
  isFirstSubmissionInTier: boolean;
  creator: SubmissionCreator;
}

export interface MySubmissionsParams {
  currentPage?: number;
  pageSize?: number;
}

export type MySubmissionsResponse = BaseApiResponse<PaginatedResponse<CampaignSubmission>>;

export type MyCampaignSubmissionsResponse = BaseApiResponse<PaginatedResponse<CampaignSubmission>>;

export type CampaignSubmissionResponse = BaseApiResponse<{
  id: string;
  campaignId: string;
  customerId: string;
  status: string;
  post: {
    id: string;
    type: UgcPostType;
    caption: string;
    tags: string[];
    status: string;
  };
}>;
