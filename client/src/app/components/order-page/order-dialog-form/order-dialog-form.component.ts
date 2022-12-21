import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog-form',
  templateUrl: './order-dialog-form.component.html',
  styleUrls: ['./order-dialog-form.component.css']
})
export class OrderDialogFormComponent {
  public displayedColumns = ['name', 'quantity', 'cost', 'delete'];
  public positions = [
    {name: 'Black tea', cost: '0.69', quantity: 2, id: '1'},
    {name: 'Green tea', cost: '0.79', quantity: 2, id: '1'},
    {name: 'Apple pie (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
     {name: 'Black tea', cost: '0.69', quantity: 2, id: '1'},
    {name: 'Green tea', cost: '0.79', quantity: 2, id: '1'},
    {name: 'Apple pie (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
    {name: 'Pie with beef and mushrooms (1 piece)', cost: '2.49', quantity: 2, id: '1'},
  ];

  constructor(
    public dialogRef: MatDialogRef<OrderDialogFormComponent>
  ) {}

  public getTotalCost() {
    return 50;
  }

  public close() {
    this.dialogRef.close();
  }
}
