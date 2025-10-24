// src/models/crud/orderCrud.interface.ts

import { Order, OrderStatus } from '../entity/order.entity.js';
import { OrderInput } from '../../dtos/order.dto.js';

export interface OrderCrud {
  getAll(): Promise<Order[]>;
  getById(id: number): Promise<Order | undefined>;
  getByUserId(userId: number): Promise<Order[]>;
  create(order: OrderInput): Promise<Order>;
  delete(id: number): Promise<boolean>;
  updateStatus(id: number, status: OrderStatus): Promise<Order | undefined>;
}
