import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})

export class PositionDialogComponent implements OnInit {
  public positionDialogForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required])
  });
  public categoryId?: string;

  constructor(
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    private positionService: PositionService
  ) {}

  public ngOnInit(): void {
    this.categoryId = this.positionService.categoryId;
  }

  public onSubmit(form: FormGroupDirective) {
    const { name, cost } = this.positionDialogForm.value;
    const user = JSON.parse(localStorage.getItem('userData')!).id as string;
    if (name && cost && user && this.categoryId) {
      const position = { name, cost: +cost, user, category: this.categoryId };
      console.log('POSITION: ', position);
      //this.positionService.createPosition(position);
    }
    this.cleanForm(form);
    this.closeDialogForm();
  }

  public closeDialogForm(): void {
    this.dialogRef.close();
  }

  public cleanForm(form: FormGroupDirective) {
    this.positionDialogForm.reset();
    form.resetForm();
  }

}
