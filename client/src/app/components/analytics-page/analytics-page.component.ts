import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Analytics } from 'src/app/models/analytics.model';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import  {chartOptions}  from 'src/app/utils/diagramChartHelper';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
@ViewChild('chart') chartRef!: ElementRef;
  public analyticSub?: Subscription;
  public average?: number;
  public chartOptions?: any;
  public chart!: any;
  public pending = true;
  private dataPoints0 = [];
  private dataPoints1 = [];

  constructor(
    private analyticsService: AnalyticsService
  ) { }


  public ngAfterViewInit(): void {
    this.analyticSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      data.chart.map(item => {
        this.dataPoints0.push( {x: new Date(item.label), y: item.income} as never)
      })

      data.chart.map(item => {
        this.dataPoints1.push( {x: new Date(item.label), y: item.orders} as never)
      })
      this.chartOptions = chartOptions(this.dataPoints0, this.dataPoints1);

      this.average = data.average;
      this.pending = false;

      const chart = new CanvasJS.Chart("chartContainer", this.chartOptions);

      chart.render();
    });
  }

  public ngOnDestroy(): void {
    this.analyticSub?.unsubscribe();
  }

  public getChartInstance(chart: object) {
    this.chart = chart;
  }
}
