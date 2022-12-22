import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderPosition } from 'src/app/models/order.model';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public orderPositions: OrderPosition[] = [];
  public totalPrice = 0;

  constructor(
    private http: HttpClient
  ) {}

  public addPosition(position: OrderPosition): void {
    const i = this.orderPositions.findIndex(pos => pos._id === position._id);
    if (i !== -1) {
      this.orderPositions[i].quantity += position.quantity;
    } else {
      this.orderPositions.push({...position});
    }
    this.totalPrice = this.countTotalPrice(this.orderPositions);
  }

  public createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order);
  }

  public getOrders(paramsObj: { limit: number, offset: number }): Observable<{allOrdersLength: string, orders: Order[]}> {
    return this.http.get<{allOrdersLength: string, orders: Order[]}>('/api/order', {
      params: new HttpParams({
        fromObject: paramsObj
      })
    });
  }

  public removePosition(id: string): void {
    this.orderPositions = this.orderPositions.filter(pos => pos._id !== id);
    this.totalPrice = this.countTotalPrice(this.orderPositions);
  }

  private countTotalPrice(positions: OrderPosition[]) {
    return positions.reduce((acc: number, curVal: OrderPosition) => acc + curVal.cost * curVal.quantity, 0);
  }
}
