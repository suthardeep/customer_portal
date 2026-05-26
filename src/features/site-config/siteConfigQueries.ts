import { queryOptions } from "@tanstack/react-query";
import { getSiteConfig } from "./siteConfigService";
import { siteConfigKeys } from "./siteConfigQueryFactory";
import type { SiteConfig } from "./types/types";

export const siteConfigQueries = {
  detail: () =>
    queryOptions({
      queryKey: siteConfigKeys.detail(),
      queryFn: async (): Promise<SiteConfig> => {
        const response = await getSiteConfig();
        return response.data;
      },
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
    }),
};
