import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order, OrderPosition } from 'src/app/models/order.model';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent {
  @Input() public ordersHistory: Order[] = [];
  public displayedColumns = ['number', 'date', 'time', 'amount', 'dialog'];

  constructor(public dialog: MatDialog) {}

  public getTotalPrice(order: Order) {
    return order.list.reduce((acc: number, item: OrderPosition) => acc + item.cost * item.quantity, 0 );
  }

  public openOrderDetails(enterAnimationDuration: string, exitAnimationDuration: string, order: Order) {
    console.log('Order details for open dialog: ', order);
    this.dialog.open(HistoryDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        order: {
          number: order.order,
          orderPositions: order.list
        },
        price: this.getTotalPrice(order)
      }
    });
  }
}
