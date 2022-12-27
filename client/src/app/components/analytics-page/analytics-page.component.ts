import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Analytics, TodayOrder } from 'src/app/models/analytics.model';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { dayAnalyticsOptions, chartOptions } from 'src/app/utils/diagramChartHelper';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  public analyticSub?: Subscription;
  public average?: number;
  public chartOptions?: any;
  public chart!: any;
  public pending = true;
  public popularProducts?: [string, number][];
  private dataPoints0 = [];
  private dataPoints1 = [];

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  public ngAfterViewInit(): void {
    this.analyticSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      this.popularProducts = data.popularProducts;
      this.average = data.average;

      data.chart.map(item => {
        this.dataPoints0.push({ x: new Date(item.label), y: item.income } as never)
      })

      data.chart.map(item => {
        this.dataPoints1.push({ x: new Date(item.label), y: item.orders } as never)
      })
      this.chartOptions = chartOptions(this.dataPoints0, this.dataPoints1);

      const todayOptions = data.todayOrders.map((item: TodayOrder) => {
        return { x: new Date(item.date), y: item.checkAmount } as never;
      });

      const dayAnalytics = new CanvasJS.Chart("dayAnalytics", dayAnalyticsOptions(todayOptions));
      const chart = new CanvasJS.Chart("chartContainer", this.chartOptions);

      dayAnalytics.render();
      chart.render();

      this.pending = false;
    });
  }

  public ngOnDestroy(): void {
    this.analyticSub?.unsubscribe();
  }

  public getChartInstance(chart: object) {
    this.chart = chart;
  }
}
