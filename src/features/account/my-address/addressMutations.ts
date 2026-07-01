import { showErrorToasts } from "@/components/toast";
import { queryClient } from "@/queryClient";
import { useMutation } from "@tanstack/react-query";
import { addressKeys } from "./addressQueryFactory";
import { createAddress, deleteAddress, updateAddress } from "./addressService";
import { useSelectedAddressStore } from "./stores/selectedAddressStore";
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
    onSuccess: (updatedAddress, payload) => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });
      queryClient.invalidateQueries({
        queryKey: addressKeys.detail(payload.id),
      });

      // Keep the persisted "selected address" snapshot in sync after an edit.
      const { activeAddress, selectSavedAddress } =
        useSelectedAddressStore.getState();
      if (activeAddress?.id === updatedAddress.id) {
        selectSavedAddress(updatedAddress);
      }
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};

export const useDeleteAddressMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteAddress({ data: id });
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: addressKeys.list() });

      // Clear the persisted "selected address" if it was just deleted.
      const { activeAddress, clearSelection } =
        useSelectedAddressStore.getState();
      if (activeAddress?.id === deletedId) {
        clearSelection();
      }
    },
    onError: (error) => {
      showErrorToasts(error);
    },
  });
};
