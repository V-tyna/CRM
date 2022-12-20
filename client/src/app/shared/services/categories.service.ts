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

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>('/api/category/' + id);
  }

  public createCategory(name: string, image?: File): Observable<Category> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    return this.http.post<Category>('/api/category', formData);
  }

  public updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);
    return this.http.patch<Category>('/api/category/' + id, formData);
  }
}
