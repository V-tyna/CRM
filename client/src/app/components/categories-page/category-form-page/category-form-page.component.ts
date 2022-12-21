import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { PopupService } from '../../../shared/services/popup.service';

@Component({
  selector: 'app-category-form-page',
  templateUrl: './category-form-page.component.html',
  styleUrls: ['./category-form-page.component.css'],
  providers: [CategoriesService, PopupService]
})

export class CategoryFormPageComponent implements OnInit, OnDestroy {
  @ViewChild('inputPickFile') inputRef!: ElementRef;
  public image?: File;
  public imagePreview = '';
  public isNew = true;
  public categoryForm!: FormGroup;
  public category?: Category;
  private dialogSub?: Subscription;
  private categorySub?: Subscription;
  private routeSub?: Subscription;

  constructor(
    private categoriesService: CategoriesService,
    private popupService: PopupService,
    private positionService: PositionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
        this.categorySub = this.categoriesService.getCategoryById(params['id']).subscribe((category) => {
          this.category = category;
          this.categoryForm.controls['name'].setValue(this.category.name);
          if (category.imageUrl) {
            this.imagePreview = category.imageUrl;
          }
        });
        this.positionService.setCategoryId(params['id']);
      }
    });
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  public deleteCategory() {
    this.dialogSub = this.popupService.confirmationDialogMessage().subscribe(res =>{
      if (res) {
        this.categorySub = this.categoriesService.deleteCategory(this.category!._id!)
        .subscribe({
          next: (res) => {
            this.popupService.showMessage(res.message);
          },
          error: (error) => {
            this.popupService.showMessage(error.error.message);
          },
          complete: () => {
            this.router.navigate(['/categories']);
          }
        });
      }
    });
  }

  public inputFileTrigger() {
    this.inputRef.nativeElement.click();
  }

  public onFileUpload(event: Event) {
    const file = (<HTMLInputElement>event.target).files![0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  public onSubmit() {
    if (this.isNew) {
      this.categorySub = this.categoriesService.createCategory(this.categoryForm.value.name, this.image)
        .subscribe({
          next: (res) => {
            console.log('Response after creating category: ', res);
            this.popupService.showMessage('Category was successfully added.');
            this.router.navigate([`/categories/${res._id}`]);
          },
          error: (e) =>  this.popupService.showMessage(e.message)
        });

    } else {
      this.categorySub = this.categoriesService.updateCategory(this.category!._id!, this.categoryForm.value.name, this.image)
        .subscribe(() => this.popupService.showMessage('Category was successfully updated.'));
    }
  }
}
