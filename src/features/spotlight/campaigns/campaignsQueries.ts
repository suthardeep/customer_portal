import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getCampaignDetail, getCampaignList } from "./campaignsService";
import { campaignKeys } from "./campaignsQueryFactory";
import type { CampaignListParams } from "./types/types";

export const campaignQueries = {
  campaignList: (params: CampaignListParams) =>
    queryOptions({
      queryKey: campaignKeys.campaignList(params),
      queryFn: async () => {
        const response = await getCampaignList({ data: params });
        return response.data;
      },
    }),

  campaignListInfinite: (params: Omit<CampaignListParams, "currentPage">) =>
    infiniteQueryOptions({
      queryKey: campaignKeys.campaignListInfinite(params),
      queryFn: async ({ pageParam }) => {
        const response = await getCampaignList({
          data: { ...params, currentPage: pageParam },
        });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  campaignDetail: (campaignId: string) =>
    queryOptions({
      queryKey: campaignKeys.campaignDetail(campaignId),
      queryFn: async () => {
        const response = await getCampaignDetail({ data: { campaignId } });
        return response.data;
      },
    }),
};
