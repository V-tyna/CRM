import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderPosition } from 'src/app/models/order.model';


@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'quantity', 'cost'];
  public orderPositions: OrderPosition[] = [];
  public totalPrice = 0;
  public number?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { order: {number: string, orderPositions: OrderPosition[]}, price: number },
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
  ) {}

  public ngOnInit(): void {
      this.orderPositions = this.data.order.orderPositions;
      this.number = this.data.order.number;
      this.totalPrice = this.data.price;
  }

  public close() {
    this.dialogRef.close();
  }
}
