import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';

@Injectable()

export class CategoriesService {
  constructor(
    private http: HttpClient
  ) {}

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }
}
