// src/services/orderDetail.service.ts

import MockOrderDetail from '../models/implementations/mock/mockOrderDetail.js';
import { OrderDetail } from '../models/interface/orderDetail.js';
import { OrderDetailInput } from '../dtos/orderDetail.dto.js';

class OrderDetailService {
  async getAll(): Promise<OrderDetail[]> {
    return MockOrderDetail.getAll();
  }

  async getById(id: number): Promise<OrderDetail | undefined> {
    return MockOrderDetail.getById(id);
  }

  async getByProductId(productId: number): Promise<OrderDetail[]> {
    return MockOrderDetail.getByProductId(productId);
  }

  async getByOrderId(orderId: number): Promise<OrderDetail[]> {
    return MockOrderDetail.getByOrderId(orderId);
  }

  async create(data: OrderDetailInput): Promise<OrderDetail> {
    return MockOrderDetail.create(data);
  }

  async delete(id: number): Promise<boolean> {
    return MockOrderDetail.delete(id);
  }
}

export default new OrderDetailService();
