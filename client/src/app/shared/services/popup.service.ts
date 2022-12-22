import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Injectable()

export class PopupService {
  public isConfirmed?: boolean;
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  public confirmationDialogMessage(message: string){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message
    }
  });

   return dialogRef.afterClosed();
  }

  public showMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
