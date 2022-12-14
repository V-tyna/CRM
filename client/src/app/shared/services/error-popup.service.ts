import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class ErrorPopupService {
  constructor(private _snackBar: MatSnackBar) {}

  public showErrorMessage(e: HttpErrorResponse) {
    this._snackBar.open(e.error.message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public showMessage(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}