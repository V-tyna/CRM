import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

interface Position {
  name: string,
  cost: number
}

@Component({
  selector: 'app-category-form-page',
  templateUrl: './category-form-page.component.html',
  styleUrls: ['./category-form-page.component.css']
})

export class CategoryFormPageComponent implements OnInit {
  public positions$?: Observable<Position[]>;

  constructor(
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.positions$ = new Observable<Position[]>((sub) => sub.next([{name: 'Coffee', cost: 1.99}, {name: 'Very long name something really long', cost: 2.99}]));
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    //TODO DialogAnimationsExampleDialog must be component of Dialog Window with such form:
    // ***********************************************************************************
    // @Component({
    //   selector: 'dialog-animations-example-dialog',
    //   templateUrl: 'dialog-animations-example-dialog.html',
    // })
    // export class DialogAnimationsExampleDialog {
    //   constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
    // }
    // ***********************************************************************************
    // this.dialog.open(DialogAnimationsExampleDialog, {
    //   width: '250px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    // });
  }
}
