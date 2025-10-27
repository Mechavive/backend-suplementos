// src/models/interface/order.ts

export type OrderStatus = 'pending' | 'paid' | 'cancel';

export interface Order {
  order_id: number;
  user_id: number;
  status: OrderStatus;
  total: number;
  order_date: Date;
}
