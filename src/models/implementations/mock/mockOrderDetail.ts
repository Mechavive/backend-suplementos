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
    return new Promise<OrderDetail[]>((resolve) => {
      resolve(this.OrderDetails);
    });
  }
  getById(id: number): Promise<OrderDetail> {
    return new Promise<OrderDetail>((resolve, reject) => {
      const result = this.OrderDetails.find((OrderD: OrderDetail) => {
        return OrderD.getOrderDetailId() === id;
      });

      if (!result) {
        reject(new Error(`OrderDetail with id ${id} doesnt exists`));
      } else {
        resolve(result);
      }
    });
  }
  getByOrderId(orderId: number): Promise<OrderDetail[]> {
    return new Promise<OrderDetail[]>((resolve, reject) => {
      const result = this.OrderDetails.filter((OrderD: OrderDetail) => {
        return OrderD.getOrderId() === orderId;
      });

      if (result.length === 0) {
        reject(new Error(`OrderDetail with OrderId ${orderId} doesnt exists`));
      } else {
        resolve(result);
      }
    });
  }
  getByProductId(productId: number): Promise<OrderDetail[]> {
    return new Promise<OrderDetail[]>((resolve, reject) => {
      const result = this.OrderDetails.filter((OrderD: OrderDetail) => {
        return OrderD.getProductId() === productId;
      });

      if (result.length === 0) {
        reject(new Error(`OrderDetail with ProductId ${productId} doesnt exists`));
      } else {
        resolve(result);
      }
    });
  }
  create(orderDetail: OrderDetail): Promise<OrderDetail> {
    return new Promise<OrderDetail>((resolve) => {
      orderDetail.setOrderDetailId(this.idCounter);
      this.OrderDetails.push(orderDetail);
      this.idCounter++;
      resolve(orderDetail);
    });
  }
  delete(orderDetailId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.OrderDetails.findIndex(
        (orderDetail: OrderDetail) => orderDetail.getOrderDetailId() === orderDetailId,
      );

      if (index == -1) {
        reject(new Error(`OrderDetail with id ${orderDetailId} doesnt exist`));
      } else {
        this.OrderDetails.splice(index, 1);
      }
    });
  }
}

export default new MockOrderDetail();
