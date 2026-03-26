import type { CampaignListParams } from "./types/types";
import type { MySubmissionsParams } from "./types/submission.types";

export const campaignKeys = {
  all: ["campaigns"] as const,
  campaigns: () => [...campaignKeys.all, "campaigns"] as const,
  campaignList: (params: CampaignListParams) =>
    [...campaignKeys.campaigns(), "list", params] as const,
  campaignListInfinite: (params: Omit<CampaignListParams, "currentPage">) =>
    [...campaignKeys.campaigns(), "infinite", params] as const,
  campaignDetail: (campaignId: string) =>
    [...campaignKeys.campaigns(), "detail", campaignId] as const,
  mySubmissions: (params: MySubmissionsParams) =>
    [...campaignKeys.all, "submissions", "my", params] as const,
  mySubmissionsInfinite: () =>
    [...campaignKeys.all, "submissions", "my", "infinite"] as const,
  myCampaignSubmissions: (campaignId: string, params: MySubmissionsParams) =>
    [...campaignKeys.all, "submissions", campaignId, "my", params] as const,
  myCampaignSubmissionsInfinite: (campaignId: string) =>
    [...campaignKeys.all, "submissions", campaignId, "my", "infinite"] as const,
};
