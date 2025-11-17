// src/models/implementations/mock/mockOrder.ts

import { Order, OrderStatus } from '../../entity/order.entity';
import { OrderInput, OrderCreatePayload } from '../../../dtos/order.dto';
import { OrderCrud } from '../../crud/orderCrud.interface';
// para conectar con orderDetail
import { OrderDetail } from '../../entity/orderDetail.entity';

// helper para hacer las ordenes con order detail
function createOrderWithDetails(
  idCounter: () => number,
  userId: number,
  status: OrderStatus,
  date: Date,
  detailsData: { productId: number; quantity: number; price: number }[],
): Order {
  const order = new Order(idCounter(), userId, status, 0, date); // total inicial 0

  // Crear detalles
  order.details = detailsData.map(
    (item, idx) =>
      new OrderDetail(idx + 1, order.order_id, item.productId, item.quantity, item.price),
  );

  // Calcular total automáticamente
  order.total = order.details.reduce((sum, d) => sum + d.getSubtotal(), 0);

  return order;
}

export class MockOrder implements OrderCrud {
  private orders: Order[] = [];
  private idCounter = 1;

  constructor() {
    // Para pasar idCounter como función que devuelve y aumenta
    const nextId = () => this.idCounter++;

    this.orders = [
      createOrderWithDetails(nextId, 1, 'pending', new Date('2023-10-01T10:00:00Z'), [
        { productId: 101, quantity: 2, price: 20 },
        { productId: 102, quantity: 3, price: 20 },
      ]),
      createOrderWithDetails(nextId, 2, 'paid', new Date('2023-10-02T11:30:00Z'), [
        { productId: 103, quantity: 5, price: 50 },
      ]),
      createOrderWithDetails(nextId, 1, 'cancel', new Date('2023-10-03T09:45:00Z'), [
        { productId: 104, quantity: 1, price: 80.5 },
      ]),
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

  //async create(data: OrderInput): Promise<Order> {
  async create(data: OrderInput | OrderCreatePayload): Promise<Order> {
    // status siempre comienza en "pending", sin importar el input
    const newOrder = new Order(
      this.idCounter++, // order_id
      data.user_id, // user_id
      'pending', // status
      //data.total, // total (calculado en el serviceOrder)
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
