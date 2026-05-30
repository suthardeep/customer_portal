export interface SizeChartRow {
  [column: string]: string;
}

export interface SizeChart {
  id: string;
  vendorId: string;
  name: string;
  unit: string;
  columns: string[];
  rows: SizeChartRow[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SizeChartResponse {
  statusCode: number;
  message: string;
  data: SizeChart;
}
