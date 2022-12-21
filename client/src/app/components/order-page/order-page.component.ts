import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { OrderDialogFormComponent } from './order-dialog-form/order-dialog-form.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [CategoriesService]
})

export class OrderPageComponent implements OnInit, OnDestroy {
  public categoryId?: string;
  private routeSub?: Subscription;

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService, // DO I need this here???
    private positionService: PositionService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryId = event.url.split('/')[2];
      }
      if (this.categoryId) {
        this.positionService.setCategoryId(this.categoryId);
      }
    })
  }

  public ngOnDestroy(): void {
    this.positionService.setCategoryId('');
    this.routeSub?.unsubscribe();
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OrderDialogFormComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        positions: [
          {name: 'Black tea', cost: '0.69', quantity: 2},
          {name: 'Green tea', cost: '0.79', quantity: 2},
          {name: 'Apple pie (1 piece)', cost: '2.49', quantity: 2},
          {name: 'Pie with beef and (1 piece)', cost: '2.49', quantity: 2},
        ]
      },
    });
  }
}
