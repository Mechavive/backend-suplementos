// src/dtos/order.dto.ts
import { Order } from '../models/entity/order.entity.js';

export type OrderInput = Omit<Order, 'order_id'>;
