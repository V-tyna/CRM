import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/position.model';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  public categoryId = '';

  constructor(
    private http: HttpClient,
    ) {}

  public getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/position/' + this.categoryId);
  }

  public createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  public setCategoryId(id: string): void {
    this.categoryId = id;
  }
}
