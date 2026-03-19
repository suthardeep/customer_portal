import type { CampaignListParams } from "./types/types";

export const campaignKeys = {
  all: ["campaigns"] as const,
  campaigns: () => [...campaignKeys.all, "campaigns"] as const,
  campaignList: (params: CampaignListParams) =>
    [...campaignKeys.campaigns(), "list", params] as const,
  campaignListInfinite: (params: Omit<CampaignListParams, "currentPage">) =>
    [...campaignKeys.campaigns(), "infinite", params] as const,
  campaignDetail: (campaignId: string) =>
    [...campaignKeys.campaigns(), "detail", campaignId] as const,
};
