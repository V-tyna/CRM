import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from 'src/app/models/overview.model';
import { AnalyticsService } from 'src/app/shared/services/analtics.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  public data$?: Observable<Overview>;
  public today = new Date();

  constructor(private analyticsService: AnalyticsService) {}

  public ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();
  }
}
