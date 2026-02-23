import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";
import { apiRequest } from "@/utils/apiRequest";
import { getToken } from "@/utils/getToken";
import type { User } from "@/types/user.types";
import type { BaseApiResponse } from "@/types/baseApi.types";

export const getCustomerProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<BaseApiResponse<User>> => {
    const token = getToken();
    return apiRequest<BaseApiResponse<User>>("/v1/customer/profile", {
      token,
    });
  },
);

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
});
