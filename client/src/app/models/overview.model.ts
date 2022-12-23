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
