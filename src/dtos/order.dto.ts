// src/dtos/order.dto.ts
import { Order } from '../models/entity/order.entity';

export type OrderItem ={
  productId: number;
  quantity: number;
}

export type OrderInput ={
  user_id: number;
  total: number;
  items: OrderItem[];
}
