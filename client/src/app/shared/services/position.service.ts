import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/position.model';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  public categoryId = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    ) {}

  public createPosition(position: Position): Observable<HttpResponse<Position>> {
    return this.http.post<HttpResponse<Position>>('/api/position', position);
  }

  public setCategoryId(id: string): void {
    this.categoryId = id;
  }
}
