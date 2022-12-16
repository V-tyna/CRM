import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/shared/services/position.service';
import { PositionDialogComponent } from '../position-dialog/position-dialog.component';
@Component({
  selector: 'app-category-form-page',
  templateUrl: './category-form-page.component.html',
  styleUrls: ['./category-form-page.component.css'],
})

export class CategoryFormPageComponent implements OnInit {
  public positions$?: Observable<Position[]>;

  constructor(
    public dialog: MatDialog,
    private positionService: PositionService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.positions$ = new Observable<Position[]>((sub) => {
      sub.next([{ name: 'Coffee', cost: 1.99, user: 'user', category: 'drinks' },
      { name: 'Very long name something really long', cost: 2.99, user: 'user', category: 'drinks' }
      ]);
    });

    this.route.params.subscribe((params: Params) => {
      this.positionService.setCategoryId(params['id']);
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {

    this.dialog.open(PositionDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
