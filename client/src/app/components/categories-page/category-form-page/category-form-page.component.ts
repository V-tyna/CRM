import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/shared/services/position.service';
import { PositionDialogComponent } from '../position-dialog/position-dialog.component';
@Component({
  selector: 'app-category-form-page',
  templateUrl: './category-form-page.component.html',
  styleUrls: ['./category-form-page.component.css'],
})

export class CategoryFormPageComponent implements OnInit, OnDestroy {
  public positions$?: Observable<Position[]>;
  public routeSub?: Subscription;

  constructor(
    public dialog: MatDialog,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.positionService.setCategoryId(params['id']);
    });
    this.positions$ = this.positionService.getAllPositions();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(PositionDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnDestroy(): void {
      this.routeSub?.unsubscribe();
  }
}
