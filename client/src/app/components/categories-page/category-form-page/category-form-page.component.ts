import { AfterViewChecked, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/shared/services/position.service';
import { PositionDialogComponent } from '../position-dialog/position-dialog.component';
@Component({
  selector: 'app-category-form-page',
  templateUrl: './category-form-page.component.html',
  styleUrls: ['./category-form-page.component.css'],
})

export class CategoryFormPageComponent implements OnInit, AfterViewChecked, OnDestroy {
  public positions?: Position[];
  private positionSub?: Subscription;
  private routeSub?: Subscription;

  constructor(
    public dialog: MatDialog,
    private detectChanger: ChangeDetectorRef,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.positionService.setCategoryId(params['id']);
    });
    this.positionSub = this.positionService.getAllPositions().subscribe(data => {
      this.positions = data;
      this.positionService.sharedPositions = data;
    });
  }

  public ngAfterViewChecked() {
    this.positions = this.positionService.sharedPositions;
    this.detectChanger.detectChanges();
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

  public delete(id: string): void {
    this.routeSub = this.positionService.deletePosition(id).subscribe();
    this.positionService.removePosition(id, this.positions!);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.positionSub?.unsubscribe();
  }
}
