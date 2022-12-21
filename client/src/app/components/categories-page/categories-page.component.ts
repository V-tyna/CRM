import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
  providers: [ CategoriesService ]
})
export class CategoriesPageComponent implements OnInit {
  public categories$?: Observable<Category[]>;

  constructor(
    private categoriesService: CategoriesService
  ) {}

  public ngOnInit(): void {
    this.categories$ = this.categoriesService.getAllCategories();
  }
}
