import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { CampaignDetailApiResponse, CampaignListParams, CampaignListResponse } from "./types/types";
import type {
  CreateCampaignSubmissionRequest,
  CampaignSubmissionResponse,
  MySubmissionsParams,
  MySubmissionsResponse,
  MyCampaignSubmissionsResponse,
} from "./types/submission.types";

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

export const getMySubmissions = createServerFn({ method: "GET" })
  .inputValidator((data: MySubmissionsParams) => data)
  .handler(async ({ data }): Promise<MySubmissionsResponse> => {
    const token = getToken();
    return apiRequest<MySubmissionsResponse>("/v1/ugc/campaigns/submissions/my", {
      params: data,
      token,
    });
  });

export const getMyCampaignSubmissions = createServerFn({ method: "GET" })
  .inputValidator((data: { campaignId: string } & MySubmissionsParams) => data)
  .handler(async ({ data }): Promise<MyCampaignSubmissionsResponse> => {
    const token = getToken();
    const { campaignId, ...params } = data;
    return apiRequest<MyCampaignSubmissionsResponse>(
      `/v1/ugc/campaigns/${campaignId}/submissions/my`,
      { params, token },
    );
  });

export const submitCampaign = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { campaignId: string } & CreateCampaignSubmissionRequest) => data,
  )
  .handler(async ({ data }): Promise<CampaignSubmissionResponse> => {
    const token = getToken();
    const { campaignId, ...body } = data;

    return apiRequest<CampaignSubmissionResponse>(
      `/v1/ugc/campaigns/${campaignId}/submit`,
      {
        method: "POST",
        body,
        token,
      },
    );
  });
