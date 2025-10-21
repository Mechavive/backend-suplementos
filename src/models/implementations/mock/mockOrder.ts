// src/models/implementations/mock/mockOrder.ts

import { Order, OrderStatus } from '../../interface/order.js';
import { OrderInput } from '../../../dtos/order.dto.js';
import { OrderCrud } from '../../crud/orderCrud.interface.js';

export class MockOrder implements OrderCrud {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados
    this.orders = [
      {
        order_id: this.idCounter++,
        user_id: 1,
        status: 'pending',
        total: 100.0,
        order_date: new Date('2023-10-01T10:00:00Z'),
      },
      {
        order_id: this.idCounter++,
        user_id: 2,
        status: 'paid',
        total: 250.0,
        order_date: new Date('2023-10-02T11:30:00Z'),
      },
      {
        order_id: this.idCounter++,
        user_id: 1,
        status: 'cancel',
        total: 80.5,
        order_date: new Date('2023-10-03T09:45:00Z'),
      },
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
    const newOrder: Order = {
      ...data,
      order_id: this.idCounter++,
      order_date: new Date(), // se asigna automáticamente
      status: 'pending', // siempre pendiente al crear (incluso si pongo status: "cancel" en postman seguiria siendo pending)
    };

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

    order.status = status;
    return order;
  }

  // Método útil para tests
  clear(): void {
    this.orders = [];
    this.idCounter = 1;
  }
}

export default new MockOrder();
