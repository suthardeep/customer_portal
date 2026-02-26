import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import { createServerFn } from "@tanstack/react-start";
import type { BaseApiResponse } from "@/types/baseApi.types";
import type {
  Address,
  CreateAddressRequest,
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
