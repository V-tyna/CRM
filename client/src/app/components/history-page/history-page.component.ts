import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/filter.model';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
  providers: [PopupService]
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  public disabled = false;
  public isFilterVisible = false;
  public filter: Filter = {};
  public noSuchOrder = false;
  public orderLength = 0;
  public orderNumber?: number;
  public orderSub?: Subscription;
  public orders: Order[] = [];
  public pageEvent?: PageEvent;
  public pageIndex = 0; // offset
  public pageSize = 10; //limit
  public tooltipContent = 'Open filters';

  constructor(
    private orderService: OrderService,
    private popupService: PopupService
  ) { }

  public ngOnInit(): void {
    this.getOrders();
  }

  public ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

  public applyFilter(e: Filter) {
    this.pageIndex = 0;
    this.filter = e;
    this.orderNumber = e.order;
    this.getOrders();
    this.filter = {};
  }

  private getOrders() {
    this.disabled = true;
    const params = {
      ...this.filter,
      limit: this.pageSize,
      offset: this.pageIndex * this.pageSize || 0
    }
    this.orderSub = this.orderService.getOrders(params).subscribe({
      next: (data) => {
        this.orders = data.orders;
        this.orderLength = +data.allOrdersLength;
        if (this.orderNumber) {
          this.noSuchOrder = +this.orderNumber > this.orderLength || +this.orderNumber < 1;
        }
      },
      error: (e) => this.popupService.showMessage(e.message),
      complete: () => this.disabled = false
    });
  }

  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.orderLength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getOrders();
  }


  public toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
    this.tooltipContent = this.isFilterVisible ? 'Close filters' : 'Open filters';
  }
}
