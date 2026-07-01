import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { addressQueries } from "../addressQueries";
import type { AddressFormData } from "../types/types";

interface UsePincodeAutofillParams {
  watch: UseFormWatch<AddressFormData>;
  setValue: UseFormSetValue<AddressFormData>;
}

/**
 * Watches the form's `pincode` field and auto-fills `city`/`state` from the
 * pincode lookup query once a valid 6-digit pincode resolves. Always
 * overwrites city/state with the resolved values.
 */
export const usePincodeAutofill = ({
  watch,
  setValue,
}: UsePincodeAutofillParams) => {
  const pincode = watch("pincode");

  const { data, isFetching } = useQuery(addressQueries.pincodeLookup(pincode));

  useEffect(() => {
    if (!data) return;
    setValue("city", data.city, { shouldValidate: true, shouldDirty: true });
    setValue("state", data.state, { shouldValidate: true, shouldDirty: true });
  }, [data, setValue]);

  return { isLoading: isFetching };
};
