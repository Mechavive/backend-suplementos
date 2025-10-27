// src/models/implementations/mock/mockOrder.ts

import { Order, OrderStatus } from '../../entity/order.entity';
import { OrderInput } from '../../../dtos/order.dto';
import { OrderCrud } from '../../crud/orderCrud.interface';

export class MockOrder implements OrderCrud {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados como instancias de Order
    this.orders = [
      new Order(
        this.idCounter++, // order_id
        1, // user_id
        'pending', // status
        100.0, // total
        new Date('2023-10-01T10:00:00Z'), // order_date
      ),
      new Order(this.idCounter++, 2, 'paid', 250.0, new Date('2023-10-02T11:30:00Z')),
      new Order(this.idCounter++, 1, 'cancel', 80.5, new Date('2023-10-03T09:45:00Z')),
    ];
  }

  async getAll(): Promise<Order[]> {
    return this.orders;
  }

  async getById(id: number): Promise<Order | undefined> {
    return this.orders.find((order) => order.order_id === id);
  }

  async getByUserId(userId: number): Promise<Order[]> {
    return this.orders.filter((order) => order.user_id === userId);
  }

  async create(data: OrderInput): Promise<Order> {
    // status siempre comienza en "pending", sin importar el input
    const newOrder = new Order(
      this.idCounter++, // order_id
      data.user_id, // user_id
      'pending', // status
      data.total, // total
      new Date(), // order_date (actual)
    );

    this.orders.push(newOrder);
    return newOrder;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter((order) => order.order_id !== id);
    return this.orders.length < initialLength;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order | undefined> {
    const order = await this.getById(id);
    if (!order) return undefined;

    order.status = status; // usa setter de la entity
    return order;
  }

  clear(): void {
    this.orders = [];
    this.idCounter = 1;
  }
}

export default new MockOrder();
