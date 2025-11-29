// src/models/implementations/mock/mockOrder.ts

import { Order, OrderStatus } from '../../entity/order.entity';
import { OrderInput, OrderCreatePayload } from '../../../dtos/order.dto';
import { OrderCrud } from '../../crud/orderCrud.interface';
// para conectar con orderDetail
import { OrderDetail } from '../../entity/orderDetail.entity';

export class MockOrder implements OrderCrud {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor() {
    const nextId = () => this.idCounter++;

    this.orders = [
      // Carrito 1
      this.createOrderWithDetails(nextId, 1, 'pending', new Date('2023-10-01T10:00:00Z'), [
        { productId: 1, quantity: 2, price: 15000 },
        { productId: 2, quantity: 1, price: 18000 },
      ]),
      // Carrito 2
      this.createOrderWithDetails(nextId, 2, 'paid', new Date('2023-10-02T11:30:00Z'), [
        { productId: 2, quantity: 3, price: 18000 },
        { productId: 1, quantity: 1, price: 15000 },
      ]),
      // Carrito 3
      this.createOrderWithDetails(nextId, 3, 'pending', new Date('2023-10-03T12:00:00Z'), [
        { productId: 1, quantity: 4, price: 15000 },
      ]),
      // Carrito 4
      this.createOrderWithDetails(nextId, 4, 'paid', new Date('2023-10-04T13:00:00Z'), [
        { productId: 2, quantity: 2, price: 18000 },
      ]),
      // Carrito 5
      this.createOrderWithDetails(nextId, 5, 'pending', new Date('2023-10-05T14:00:00Z'), [
        { productId: 1, quantity: 1, price: 15000 },
      ]),
      // Carrito 6
      this.createOrderWithDetails(nextId, 6, 'paid', new Date('2023-10-06T15:00:00Z'), [
        { productId: 2, quantity: 5, price: 18000 },
      ]),
      // Carrito 7
      this.createOrderWithDetails(nextId, 7, 'pending', new Date('2023-10-07T16:00:00Z'), [
        { productId: 1, quantity: 2, price: 15000 },
      ]),
      // Carrito 8
      this.createOrderWithDetails(nextId, 8, 'paid', new Date('2023-10-08T17:00:00Z'), [
        { productId: 2, quantity: 3, price: 18000 },
      ]),
      // Carrito 9
      this.createOrderWithDetails(nextId, 9, 'pending', new Date('2023-10-09T18:00:00Z'), [
        { productId: 1, quantity: 1, price: 15000 },
      ]),
      // Carrito 10
      this.createOrderWithDetails(nextId, 10, 'paid', new Date('2023-10-10T19:00:00Z'), [
        { productId: 2, quantity: 2, price: 18000 },
      ]),
      // Carrito 11
      this.createOrderWithDetails(nextId, 11, 'pending', new Date('2023-10-11T20:00:00Z'), [
        { productId: 1, quantity: 3, price: 15000 },
      ]),
      // Carrito 12
      this.createOrderWithDetails(nextId, 12, 'paid', new Date('2023-10-12T21:00:00Z'), [
        { productId: 2, quantity: 1, price: 18000 },
      ]),
    ];
  }

  private createOrderWithDetails(
    idCounter: () => number,
    userId: number,
    status: OrderStatus,
    date: Date,
    detailsData: { productId: number; quantity: number; price: number }[],
  ): Order {
    const order = new Order(idCounter(), userId, status, 0, date);

    order.details = detailsData.map(
      (item, idx) =>
        new OrderDetail(idx + 1, order.order_id, item.productId, item.quantity, item.price),
    );

    //order.total = order.details.reduce((sum, d) => sum.getSubtotal() + sum, 0);
    order.total = order.details.reduce((sum, d) => sum + d.getSubtotal(), 0);

    return order;
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

  //async create(data: OrderInput): Promise<Order> {
  async create(data: OrderInput | OrderCreatePayload): Promise<Order> {
    // status siempre comienza en "pending", sin importar el input
    const newOrder = new Order(
      this.idCounter++, // order_id
      data.user_id, // user_id
      'pending', // status
      data.total ?? 0, // total (calculado en el serviceOrder), usa 0 si total es undefined
      new Date(), // order_date (actual)
    );

    // Si más adelante agrego soporte para details:
    if ('items' in data && Array.isArray(data.items)) {
      const details = data.items.map(
        (item, idx) =>
          new OrderDetail(
            idx + 1,
            newOrder.order_id,
            item.productId,
            item.quantity,
            0, // o buscar precio en ProductService
          ),
      );
      newOrder.details = details;
    }

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
