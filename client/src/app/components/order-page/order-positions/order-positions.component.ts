import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderPosition } from 'src/app/models/order.model';
import { Position } from 'src/app/models/position.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'quantity', 'cost', 'add'];
  public positions: OrderPosition[] = [];
  private routeSub?: Subscription;
  private posSub?: Subscription;

  constructor (
    private route: ActivatedRoute,
    private orderService: OrderService,
    private popupService: PopupService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.positionService.setCategoryId(params['id']);
      this.posSub = this.positionService.getAllPositions().subscribe((data: Position[]) => {
        this.positions = data.map(position => ({ _id: position._id, name: position.name, cost: position.cost, quantity: 1 }));
      })
    });
  }

  ngOnDestroy(): void {
    this.posSub?.unsubscribe();
      this.routeSub?.unsubscribe();
  }

  public addToOrder(position: OrderPosition) {
    this.orderService.addPosition(position);
    this.popupService.showMessage(`${position.name} was added in quantity: ${position.quantity}`)
  }
}
