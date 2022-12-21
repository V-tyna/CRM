import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/shared/services/position.service';
import { PositionDialogComponent } from '../position-dialog/position-dialog.component';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, OnDestroy {
  @Input() isNew = true;
  public positions?: Position[];
  private positionSub?: Subscription;
  private routeSub?: Subscription;

  constructor(
    private detectChanger: ChangeDetectorRef,
    public dialog: MatDialog,
    private positionService: PositionService
  ) {}

  public ngOnInit(): void {
    if (this.positionService.categoryId) {
      this.isNew = false;
      this.positionSub = this.positionService.getAllPositions().subscribe(data => {
        this.positions = data;
        this.positionService.setSharedPositions(data);
      });
    }
  }

  public ngOnDestroy(): void {
    this.positionService.setCategoryId('');
    this.positionService.setSharedPositions([]);
    this.routeSub?.unsubscribe();
    this.positionSub?.unsubscribe();
  }

  public ngAfterViewChecked() {
    if (!this.isNew) {
      this.positions = this.positionService.sharedPositions;
      this.detectChanger.detectChanges();
    }
  }

  public deletePosition(id: string): void {
    this.positionSub = this.positionService.deletePosition(id).subscribe();
    this.positionService.removePosition(id, this.positions!);
  }

  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PositionDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  public openDialogInEditMode(enterAnimationDuration: string, exitAnimationDuration: string, positionId: string): void {
    this.routeSub = this.positionService.getPositionById(positionId).subscribe((position) => {
      this.dialog.open(PositionDialogComponent, {
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          id: position?._id,
          name: position?.name,
          cost: position?.cost,
          editMode: true
        }
      });
    });
  }

}
