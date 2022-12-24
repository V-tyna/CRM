import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analytics, Overview } from 'src/app/models/analytics.model';

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(
    private http: HttpClient
  ) {}

  public getAnalytics(): Observable<Analytics> {
    return this.http.get<Analytics>('/api/analytics');
  }

  public getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview');
  }
}
