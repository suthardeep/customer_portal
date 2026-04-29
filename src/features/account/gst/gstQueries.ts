import { queryOptions } from "@tanstack/react-query";
import { gstKeys } from "./gstQueryFactory";
import { getGstProfileById, getGstProfiles } from "./gstService";
import type { GstProfile } from "./types/types";

export const gstQueries = {
  list: () =>
    queryOptions({
      queryKey: gstKeys.list(),
      queryFn: async (): Promise<GstProfile[]> => {
        const response = await getGstProfiles();
        return response.data;
      },
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: gstKeys.detail(id),
      queryFn: async (): Promise<GstProfile> => {
        const response = await getGstProfileById({ data: id });
        return response.data;
      },
    }),
};
