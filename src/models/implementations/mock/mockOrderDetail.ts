import { OrderDetailInput } from '../../../dtos/orderDetail.dto.js';
import { OrderDetailCrud } from '../../crud/orderDetailCrud.interface.js';
import { OrderDetail } from '../../entity/orderDetail.js';

class MockOrderDetail implements OrderDetailCrud {
  private OrderDetails: OrderDetail[] = [];
  private idCounter = 1;

  constructor() {
    this.OrderDetails = [
      new OrderDetail(this.idCounter++, 1, 1, 2, 15000),
      new OrderDetail(this.idCounter++, 1, 2, 1, 8000),
    ];
  }

  getAll(): Promise<OrderDetail[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<OrderDetail | undefined> {
    throw new Error('Method not implemented.');
  }
  getByOrderId(orderId: number): Promise<OrderDetail[]> {
    throw new Error('Method not implemented.');
  }
  getByProductId(productId: number): Promise<OrderDetail[]> {
    throw new Error('Method not implemented.');
  }
  create(order: OrderDetailInput): Promise<OrderDetail> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default new MockOrderDetail();
