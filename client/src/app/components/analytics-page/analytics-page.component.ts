import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { Analytics, ChartConfig } from 'src/app/models/analytics.model';
import { AnalyticsService } from 'src/app/shared/services/analytics.service';
import { createChartConfig } from 'src/app/utils/diagramChartHelper';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('income') incomeRef!: ElementRef;
  @ViewChild('orders') ordersRef!: ElementRef;

  public analyticSub?: Subscription;
  public average?: number;
  public pending = true;

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  public ngAfterViewInit(): void {
    const incomeConfig: ChartConfig = {
      label: 'Income',
      color: 'rgb(255, 99, 132)'
    };

    this.analyticSub = this.analyticsService.getAnalytics().subscribe((data: Analytics) => {
      incomeConfig.labels = data.chart.map(item => item.label);
      incomeConfig.data = data.chart.map(item => item.income);

      const incomeCtx = this.incomeRef.nativeElement.getContext('2d');
      incomeCtx.canvas.height = '300px';

      // Chart.register();

      // new Chart(incomeCtx, createChartConfig(incomeConfig))


      this.average = data.average;
      this.pending = false;
    });
  }

  public ngOnDestroy(): void {
    this.analyticSub?.unsubscribe();
  }
}
