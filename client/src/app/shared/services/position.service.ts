import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/position.model';

@Injectable({
  providedIn: 'root'
})

export class PositionService {
  public categoryId = '';
  public sharedPositions?: Position[]

  constructor(
    private http: HttpClient,
    ) {}

  public createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  public deletePosition(id: string): Observable<{[key: string]: string}> {
    return this.http.delete<{[key: string]: string}>('/api/position/' + id);
  }

  public editPosition(id: string, position: Position, positions: Position[]): void {
    const i = positions?.findIndex(pos => pos._id === id)!;
    position._id = id;
    positions![i] = position;
    this.setSharedPositions(positions);
  }

  public getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>('/api/position/' + this.categoryId);
  }

  public getPositionById(id: string): Observable<Position> {
    return this.http.get<Position>('/api/position/edit/' + id);
  }

  public pushPosition(position: Position, positions: Position[]): void {
    positions?.push(position);
    this.setSharedPositions(positions);
  }

  public removePosition(id: String, positions: Position[]): void {
    positions = positions?.filter(pos => pos._id !== id);
    this.setSharedPositions(positions);
  }

  public setCategoryId(id: string): void {
    this.categoryId = id;
  }

  public setSharedPositions(positions: Position[]): Position[] {
    this.sharedPositions = [...positions];
    return this.sharedPositions;
  }

  public updatePosition(id: string, position: Position): Observable<Position> {
    return this.http.patch<Position>('/api/position/' + id, position);
  }
}
