import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type {
  Address,
  CreateAddressRequest,
  PincodeLocation,
  PostalPincodeResponse,
  UpdateAddressRequest,
} from "./types/types";

export const getAddresses = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<Address[]>> => {
    const token = getToken();
    return apiRequest("/v1/addresses", { token });
  },
);

export const getAddressById = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BaseApiResponse<Address>> => {
    const token = getToken();
    return apiRequest(`/v1/addresses/${id}`, { token });
  });

export const createAddress = createServerFn({ method: "POST" })
  .inputValidator((data: CreateAddressRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<Address>> => {
    const token = getToken();
    return apiRequest("/v1/addresses", { method: "POST", body: data, token });
  });

export const updateAddress = createServerFn({ method: "POST" })
  .inputValidator((data: UpdateAddressRequest) => data)
  .handler(async ({ data }): Promise<BaseApiResponse<Address>> => {
    const { id, ...body } = data;
    const token = getToken();
    return apiRequest(`/v1/addresses/${id}`, {
      method: "PATCH",
      body,
      token,
    });
  });

export const deleteAddress = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BaseApiResponse<void>> => {
    const token = getToken();
    return apiRequest(`/v1/addresses/${id}`, { method: "DELETE", token });
  });

/** Returns the value occurring most frequently in the list, ignoring blanks. */
const majority = (values: string[]): string => {
  const counts = new Map<string, number>();
  let best = "";
  let bestCount = 0;
  for (const value of values) {
    if (!value) continue;
    const next = (counts.get(value) ?? 0) + 1;
    counts.set(value, next);
    if (next > bestCount) {
      best = value;
      bestCount = next;
    }
  }
  return best;
};

/**
 * Resolves city/state from an Indian pincode via the public postalpincode.in
 * API. This is a third-party service (not our backend), so it calls `fetch`
 * directly rather than `apiRequest`. City uses the majority `Block` value
 * across the returned post offices; state uses the majority `State`.
 */
export const getLocationByPincode = createServerFn({ method: "GET" })
  .inputValidator((pincode: string) => pincode)
  .handler(async ({ data: pincode }): Promise<PincodeLocation> => {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    if (!res.ok) throw new Error("Failed to look up pincode.");

    const json = (await res.json()) as PostalPincodeResponse;
    const result = json[0];
    const postOffices = result?.PostOffice;

    if (result?.Status !== "Success" || !postOffices?.length) {
      throw new Error("No location found for this pincode.");
    }

    return {
      city: majority(postOffices.map((po) => po.Block)),
      state: majority(postOffices.map((po) => po.State)),
    };
  });
