import { queryOptions } from "@tanstack/react-query";
import { getRecentlyViewedProducts } from "./userActivitiesService";
import { userActivityKeys } from "./userActivitiesQueryFactory";

export const userActivityQueries = {
  recentViews: () =>
    queryOptions({
      queryKey: userActivityKeys.recentViews(),
      queryFn: async () => {
        const response = await getRecentlyViewedProducts();
        return response.data;
      },
    }),
};
