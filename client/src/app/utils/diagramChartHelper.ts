import { ChartType, ChartConfiguration, ChartData, DefaultDataPoint } from 'chart.js';
import { ChartConfig } from '../models/analytics.model';


export function createChartConfig({ labels, data, label, color }: ChartConfig): ChartConfiguration {
  return {
    type: 'bar',
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
    data: {
      labels,
      datasets: [
        {
          label: label,
          steppedLine: false,
          data: data,
          borderColor: color,
          fill: false,
          borderWidth: 1
        }
      ]
    } as unknown as ChartData<ChartType, DefaultDataPoint<ChartType>, unknown>,
  }
}
