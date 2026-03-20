import type { BaseApiResponse } from "@/types/baseApi.types";
import type { UgcPostType } from "@/features/spotlight/types/enums";

export interface CreateCampaignSubmissionRequest {
  type: UgcPostType;
  videoFileId?: string;
  imageFileIds?: string[];
  images?: string[];
  caption?: string;
  tags?: string[];
  productIds: string[];
}

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
