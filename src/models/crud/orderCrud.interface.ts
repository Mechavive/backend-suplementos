// src/models/crud/orderCrud.interface.ts

// import { Order, OrderStatus } from '../entity/order.entity';
// import { OrderInput } from '../../dtos/order.dto';

// export interface OrderCrud {
//   getAll(): Promise<Order[]>;
//   getById(id: number): Promise<Order | undefined>;
//   getByUserId(userId: number): Promise<Order[]>;
//   create(order: OrderInput): Promise<Order>;
//   delete(id: number): Promise<boolean>;
//   updateStatus(id: number, status: OrderStatus): Promise<Order | undefined>;
// }

import { Order } from '../entity/order.entity';
import { OrderInput, OrderCreatePayload } from '../../dtos/order.dto';
import { OrderStatus } from '../entity/order.entity';

export interface OrderCrud {
  getAll(): Promise<Order[]>;
  getById(id: number): Promise<Order | undefined>;
  getByUserId(userId: number): Promise<Order[]>;
  create(data: OrderInput | OrderCreatePayload): Promise<Order>;
  delete(id: number): Promise<boolean>;
  updateStatus(id: number, status: OrderStatus): Promise<Order | undefined>;
  clear(): void;
}
