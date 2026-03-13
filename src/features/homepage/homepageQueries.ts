import { queryOptions } from "@tanstack/react-query";
import {
  getHomepageConfig,
  getSectionById,
  getSectionContent,
} from "./homepageService";
import { homepageKeys } from "./homepageQueryFactory";

export const homepageQueries = {
  config: () =>
    queryOptions({
      queryKey: homepageKeys.config(),
      queryFn: async () => {
        const response = await getHomepageConfig();
        return response.data;
      },
    }),

  section: (id: string) =>
    queryOptions({
      queryKey: homepageKeys.section(id),
      queryFn: async () => {
        const response = await getSectionById({ data: id });
        return response.data;
      },
    }),

  sectionContent: (actionApi: string) =>
    queryOptions({
      queryKey: homepageKeys.sectionContent(actionApi),
      queryFn: async () => {
        const response = await getSectionContent({ data: actionApi });
        return response.data;
      },
      enabled: !!actionApi,
    }),
};
