import { queryOptions } from "@tanstack/react-query";
import { getPolicy } from "./policyService";
import { policyKeys } from "./policyQueryFactory";
import type { Policy, PolicyTypeEnum } from "./types/types";

export const policyQueries = {
  detail: (type: PolicyTypeEnum) =>
    queryOptions({
      queryKey: policyKeys.detail(type),
      queryFn: async (): Promise<Policy> => {
        const response = await getPolicy({ data: type });
        return response.data;
      },
    }),
};
