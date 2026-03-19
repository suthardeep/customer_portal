import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import type { CampaignDetailApiResponse, CampaignListParams, CampaignListResponse } from "./types/types";

export const getCampaignList = createServerFn({ method: "GET" })
  .inputValidator((data: CampaignListParams) => data)
  .handler(async ({ data }): Promise<CampaignListResponse> => {
    return apiRequest<CampaignListResponse>("/v1/ugc/campaigns", {
      params: data,
    });
  });

export const getCampaignDetail = createServerFn({ method: "GET" })
  .inputValidator((data: { campaignId: string }) => data)
  .handler(async ({ data }): Promise<CampaignDetailApiResponse> => {
    return apiRequest<CampaignDetailApiResponse>(
      `/v1/ugc/campaigns/${data.campaignId}`,
    );
  });
