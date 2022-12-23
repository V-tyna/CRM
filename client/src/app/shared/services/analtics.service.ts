import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from 'src/app/models/overview.model';

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(
    private http: HttpClient
  ) {}

  public getAnalytics(): void {

  }

  public getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview');
  }
}
