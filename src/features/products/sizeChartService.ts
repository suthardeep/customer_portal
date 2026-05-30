import { createServerFn } from "@tanstack/react-start";
import { apiRequest } from "@/utils/apiRequest";
import type { SizeChartResponse } from "./types/sizeChart.types";

export const getSizeChart = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: sizeChartId }): Promise<SizeChartResponse> => {
    return apiRequest<SizeChartResponse>(
      `/v1/size-charts/public/${sizeChartId}`,
    );
  });
