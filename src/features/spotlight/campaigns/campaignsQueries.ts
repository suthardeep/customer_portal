import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getCampaignDetail, getCampaignList, getMyCampaignSubmissions, getMySubmissions } from "./campaignsService";
import { campaignKeys } from "./campaignsQueryFactory";
import type { CampaignListParams } from "./types/types";
import type { MySubmissionsParams } from "./types/submission.types";

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

  mySubmissions: (params: MySubmissionsParams) =>
    queryOptions({
      queryKey: campaignKeys.mySubmissions(params),
      queryFn: async () => {
        const response = await getMySubmissions({ data: params });
        return response.data;
      },
    }),

  mySubmissionsInfinite: () =>
    infiniteQueryOptions({
      queryKey: campaignKeys.mySubmissionsInfinite(),
      queryFn: async ({ pageParam }) => {
        const response = await getMySubmissions({ data: { currentPage: pageParam } });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),

  myCampaignSubmissions: (campaignId: string, params: MySubmissionsParams) =>
    queryOptions({
      queryKey: campaignKeys.myCampaignSubmissions(campaignId, params),
      queryFn: async () => {
        const response = await getMyCampaignSubmissions({ data: { campaignId, ...params } });
        return response.data;
      },
    }),

  myCampaignSubmissionsInfinite: (campaignId: string) =>
    infiniteQueryOptions({
      queryKey: campaignKeys.myCampaignSubmissionsInfinite(campaignId),
      queryFn: async ({ pageParam }) => {
        const response = await getMyCampaignSubmissions({ data: { campaignId, currentPage: pageParam } });
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    }),
};
