import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { campaignKeys } from "./campaignsQueryFactory";
import { submitCampaign } from "./campaignsService";
import type { CreateCampaignSubmissionRequest } from "./types/submission.types";

export const useSubmitCampaignMutation = (campaignId: string) => {
  return useMutation({
    mutationFn: async (data: CreateCampaignSubmissionRequest) => {
      const response = await submitCampaign({
        data: { campaignId, ...data },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: campaignKeys.campaignDetail(campaignId),
      });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
