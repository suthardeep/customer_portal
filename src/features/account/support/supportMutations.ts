import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { supportKeys } from "./supportQueryFactory";
import { createSupportTicket } from "./supportService";
import type { CreateSupportTicketRequest } from "./types/types";

export const useCreateSupportTicketMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateSupportTicketRequest) => {
      const response = await createSupportTicket({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.all });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
