import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderPosition } from 'src/app/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { OrderDialogFormComponent } from './order-dialog-form/order-dialog-form.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [PopupService]
})

export class OrderPageComponent implements OnInit, OnDestroy {
  public categoryId?: string;
  private routeSub?: Subscription;

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private positionService: PositionService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.routeSub = this.router.events.subscribe((event: Event) => {
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
        orderPositions: this.orderService.orderPositions,
        price: this.orderService.totalPrice
      },
    });
  }
}
