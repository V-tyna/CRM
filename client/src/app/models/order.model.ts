
export interface Order {
  _id?: string;
  date?: Date;
  order?: number;
  list: OrderPosition[];
  user?: string;
}

export interface OrderPosition {
  _id?: string;
  cost: number;
  name: string;
  quantity: number;
}
