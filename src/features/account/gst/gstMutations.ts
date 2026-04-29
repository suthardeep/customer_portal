import { showErrorToasts } from "@/components/toast";
import { useCheckoutStore } from "@/features/checkout/stores/checkoutStore";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import {
  deleteGstProfile,
  saveGstDetails,
  updateGstProfile,
} from "./gstService";
import { gstKeys } from "./gstQueryFactory";
import type {
  CreateGstRequest,
  SaveGstFormData,
  UpdateGstRequest,
} from "./types/types";

export const useSaveGstMutation = () => {
  return useMutation({
    mutationFn: async (payload: SaveGstFormData) => {
      const response = await saveGstDetails({ data: payload });
      return response.data;
    },
    onSuccess: (data) => {
      useCheckoutStore.getState().setGstDetailsId(data.id, data);
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCreateGstMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateGstRequest) => {
      const response = await saveGstDetails({ data });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gstKeys.list() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useUpdateGstMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateGstRequest) => {
      const response = await updateGstProfile({ data });
      return response.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: gstKeys.list() });
      queryClient.invalidateQueries({ queryKey: gstKeys.detail(payload.id) });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeleteGstMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteGstProfile({ data: id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gstKeys.list() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
