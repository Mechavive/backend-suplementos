// src/dtos/order.dto.ts
import { Order } from '../models/entity/order.entity';

export interface OrderItem {
  productId: number;
  quantity: number;
}

// Ahora OrderInput incluye los items
// export type OrderInput = Omit<Order, 'order_id'> & {
//   items: OrderItem[];
// };

export interface OrderInput {
  user_id: number;
  total: number;
  items: OrderItem[];
}
