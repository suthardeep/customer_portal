import { queryOptions } from "@tanstack/react-query";
import { getCustomerProfile } from "./authService";
import { authKeys } from "./authQueryFactory";
import type { User } from "@/types/user.types";

export const authQueries = {
  profile: () =>
    queryOptions({
      queryKey: authKeys.profile(),
      queryFn: async (): Promise<User> => {
        const response = await getCustomerProfile();
        return response.data;
      },
      retry: false, // Don't retry on 401 - override global retry: 1
    }),
};
