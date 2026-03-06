import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { reviewKeys } from "./reviewsQueryFactory";
import { createReview } from "./reviewsService";
import type { CreateReviewRequest } from "./types/types";

export const useCreateReviewMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateReviewRequest) => {
      const response = await createReview({ data });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
