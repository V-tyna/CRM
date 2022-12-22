import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order, OrderPosition } from 'src/app/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-order-dialog-form',
  templateUrl: './order-dialog-form.component.html',
  styleUrls: ['./order-dialog-form.component.css'],
  providers: [PopupService]
})
export class OrderDialogFormComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'quantity', 'cost', 'delete'];
  public orderPositions: OrderPosition[] = [];
  public pendingCreatingOrder = false;
  public totalPrice = 0;
  private orderSub?: Subscription
  private popupSub?: Subscription

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orderPositions: OrderPosition[], price: number },
    public dialogRef: MatDialogRef<OrderDialogFormComponent>,
    private orderService: OrderService,
    private popupService: PopupService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.orderPositions = this.data.orderPositions;
    this.totalPrice = this.data.price;
  }

  public ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
    this.popupSub?.unsubscribe();
  }

  public getTotalCost() {
    return 50;
  }

  public close() {
    this.dialogRef.close();
  }

  public createOrder() {
    this.pendingCreatingOrder = true;
    const order: Order = {
      list: this.orderPositions.map(pos => {
        delete pos._id;
        return pos;
      })
    };
    this.popupSub = this.popupService.confirmationDialogMessage('Create new order?').subscribe(res =>{
      if (res) {
        this.orderSub = this.orderService.createOrder(order).subscribe({
          next: (res) => {
            this.popupService.showMessage('Order successfully created.');
          },
          error: (error) => {
            this.popupService.showMessage(error.message);
          },
          complete: () => {
            this.clear();
            this.close();
            this.pendingCreatingOrder = false;
            this.router.navigate(['/order']);
          }
        });
      }
    });
  }

  public removePosition(id: string) {
    this.orderService.removePosition(id);
    this.orderPositions = this.orderService.orderPositions;
    this.totalPrice = this.orderService.totalPrice;
  }

  private clear() {
    this.orderPositions, this.orderService.orderPositions = [];
    this.totalPrice, this.orderService.totalPrice = 0;
  }
}
