import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { addressKeys } from "./addressQueryFactory";
import { createAddress, deleteAddress, updateAddress } from "./addressService";
import type { CreateAddressRequest, UpdateAddressRequest } from "./types/types";

export const useCreateAddressMutation = () => {
  return useMutation({
    mutationFn: async (data: CreateAddressRequest) => {
      const response = await createAddress({ data });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useUpdateAddressMutation = () => {
  return useMutation({
    mutationFn: async (data: UpdateAddressRequest) => {
      const response = await updateAddress({ data });
      return response.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      queryClient.invalidateQueries({
        queryKey: addressKeys.detail(payload.id),
      });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeleteAddressMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteAddress({ data: id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
