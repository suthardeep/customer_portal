import { showErrorToasts } from "@/components/toast";
import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "./feedbackService";
import type { CreateFeedbackRequest } from "./types/types";

export const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateFeedbackRequest) => {
      const response = await createFeedback({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
