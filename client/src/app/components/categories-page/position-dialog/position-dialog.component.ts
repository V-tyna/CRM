import { Component, Inject, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { getErrorMessage } from 'src/app/utils/error-form-handlers';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/shared/services/position.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css'],
  providers: [PopupService]
})

export class PositionDialogComponent implements OnInit, OnDestroy {
  public positionDialogForm!: FormGroup;
  public categoryId?: string;
  public subscription?: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, cost: string, editMode: boolean },
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    private popupService: PopupService,
    private positionService: PositionService
  ) {}

  public ngOnInit(): void {
    this.categoryId = this.positionService.categoryId;
    this.positionDialogForm = new FormGroup({
      name: new FormControl(this.data?.name || '', [Validators.required]),
      cost: new FormControl(this.data?.cost || '', [Validators.required, Validators.pattern('^[0-9]*[.,]?[0-9]+$')])
    });
  }

  public errorHandler(fieldName: string,): string {
    return getErrorMessage(fieldName, this.positionDialogForm);
  }

  public closeDialogForm(): void {
    this.dialogRef.close();
  }

  public cleanForm(form: FormGroupDirective): void {
    this.positionDialogForm.reset();
    form.resetForm();
  }

  public onSubmit(form: FormGroupDirective): void {
    let position: Position;
    let { name, cost } = this.positionDialogForm.value;
    cost = cost?.toString().replace(',', '.');
    const user = JSON.parse(localStorage.getItem('userData')!).id as string;
    if (name && cost && user && this.categoryId) {
      position = { name, cost: +cost, category: this.categoryId };

    if (this.data?.editMode) {
      this.subscription = this.positionService.updatePosition(this.data.id, position).subscribe({
        next: (res) => {
          this.positionService.editPosition(this.data.id, position!, this.positionService.sharedPositions!);
          this.popupService.showMessage('Position updated.');
        },
        error: (e) => this.popupService.showMessage(e.error.message)
      });
    }
    if (this.data === null) {
      this.subscription = this.positionService.createPosition(position).subscribe({
        next: (data) => {
          position._id = data._id;
          this.positionService.pushPosition(position, this.positionService.sharedPositions!);
          this.popupService.showMessage('Position added.');
        },
        error: (e) => this.popupService.showMessage(e.error.message)
    });
    }
  }
    this.cleanForm(form);
    this.closeDialogForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
