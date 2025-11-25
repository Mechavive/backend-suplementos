import { OrderDetailInput } from '../../../dtos/orderDetail.dto';
import { OrderDetailCrud } from '../../crud/orderDetailCrud.interface';
import { OrderDetail } from '../../entity/orderDetail.entity';
import MockItemCart from './mockItemCart';

class MockOrderDetail implements OrderDetailCrud {
  private OrderDetails: OrderDetail[] = [];
  private idCounter = 1;

  constructor() {
    this.OrderDetails = [
      // Carrito 1
      new OrderDetail(
        this.idCounter++,
        1, // cart_id
        1, // product_id
        2, // quantity
        15000, // precio unitario
      ),
      new OrderDetail(this.idCounter++, 1, 2, 1, 18000), // producto 2

      // Carrito 2
      new OrderDetail(this.idCounter++, 2, 2, 3, 18000), // producto 2
      new OrderDetail(this.idCounter++, 2, 1, 1, 15000), // producto 1

      // Carrito 3
      new OrderDetail(this.idCounter++, 3, 1, 4, 15000), // producto 1

      // Carrito 4
      new OrderDetail(this.idCounter++, 4, 2, 2, 18000), // producto 2

      // Carrito 5
      new OrderDetail(this.idCounter++, 5, 1, 1, 15000), // producto 1

      // Carrito 6
      new OrderDetail(this.idCounter++, 6, 2, 5, 18000), // producto 2

      // Carrito 7
      new OrderDetail(this.idCounter++, 7, 1, 2, 15000), // producto 1

      // Carrito 8
      new OrderDetail(this.idCounter++, 8, 2, 3, 18000), // producto 2

      // Carrito 9
      new OrderDetail(this.idCounter++, 9, 1, 1, 15000), // producto 1

      // Carrito 10
      new OrderDetail(this.idCounter++, 10, 2, 2, 18000), // producto 2

      // Carrito 11
      new OrderDetail(this.idCounter++, 11, 1, 3, 15000), // producto 1

      // Carrito 12
      new OrderDetail(this.idCounter++, 12, 2, 1, 18000), // producto 2
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
  create(data: OrderDetailInput): Promise<OrderDetail> {
    return new Promise<OrderDetail>((resolve) => {
      const newOrderDetail = new OrderDetail(
        this.idCounter++,
        data.order_id,
        data.product_id,
        data.quantity,
        data.unit_price,
      );
      this.OrderDetails.push(newOrderDetail);
      resolve(newOrderDetail);
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
        resolve();
      }
    });
  }
}

export default new MockOrderDetail();
