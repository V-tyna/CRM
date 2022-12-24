export interface Analytics {
  average: number;
  chart: AnalyticsChart[];
}

export interface AnalyticsChart {
  income: number;
  label: string;
  orders: number;
}

export interface Overview {
  income: OverviewData;
  orders: OverviewData;
}

export interface OverviewData {
  compare: number;
  isHigher: boolean;
  perDay: number;
  percent: number;
  today: number;
}
