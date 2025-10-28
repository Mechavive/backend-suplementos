import { OrderDetail } from '../entity/orderDetail.entity';

export interface OrderDetailCrud {
  getAll(): Promise<OrderDetail[]>;
  getById(id: number): Promise<OrderDetail>;
  getByOrderId(orderId: number): Promise<OrderDetail[]>;
  getByProductId(productId: number): Promise<OrderDetail[]>;
  create(order: OrderDetail): Promise<OrderDetail>;
  delete(id: number): Promise<void>;
}
