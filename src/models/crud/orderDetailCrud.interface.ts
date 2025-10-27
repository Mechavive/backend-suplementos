import { OrderDetail } from '../entity/orderDetail.js';

export interface OrderDetailCrud {
  getAll(): Promise<OrderDetail[]>;
  getById(id: number): Promise<OrderDetail | undefined>;
  getByOrderId(orderId: number): Promise<OrderDetail[]>;
  getByProductId(productId: number): Promise<OrderDetail[]>;
  create(order: OrderDetail): Promise<OrderDetail>;
  delete(id: number): Promise<boolean>;
}
