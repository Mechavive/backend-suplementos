// src/dtos/orderDetail.dto.ts
import { OrderDetail } from '../models/entity/orderDetail.js';

export type OrderDetailInput = Omit<OrderDetail, 'order_detail_id'>;
