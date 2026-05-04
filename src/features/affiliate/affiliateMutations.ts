import { showErrorToasts } from "@/components/toast";
import { useMutation } from "@tanstack/react-query";
import {
  createAppInviteLink,
  createProductShareLink,
  createReferralShareLink,
  createStoreShareLink,
  createUgcShareLink,
} from "./affiliateService";
import type {
  CreateAppInviteLinkRequest,
  CreateProductShareLinkRequest,
  CreateReferralShareLinkRequest,
  CreateStoreShareLinkRequest,
  CreateUgcShareLinkRequest,
} from "./types/types";

export const useCreateProductShareLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateProductShareLinkRequest) => {
      const response = await createProductShareLink({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCreateUgcShareLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateUgcShareLinkRequest) => {
      const response = await createUgcShareLink({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCreateStoreShareLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateStoreShareLinkRequest) => {
      const response = await createStoreShareLink({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCreateReferralShareLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateReferralShareLinkRequest) => {
      const response = await createReferralShareLink({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useCreateAppInviteLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateAppInviteLinkRequest) => {
      const response = await createAppInviteLink({ data });
      return response.data;
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
