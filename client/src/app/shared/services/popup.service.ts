import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class PopupService {
  constructor(private _snackBar: MatSnackBar) {}

  public showMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
