// src/dtos/order.dto.ts
import { Order } from '../models/entity/order.js';

export type OrderInput = Omit<Order, 'order_id'>;
