// src/services/order.service.ts
import { Order } from '../models/entity/order.entity';
import { OrderInput } from '../dtos/order.dto';
import { OrderStatus } from '../models/entity/order.entity';
import { OrderDetail } from '../models/entity/orderDetail.entity';

import ProductService from './product.service';
import UserService from './user.service';
import CartService from './cart.service';

import OrderModel from '../models/implementations/mock/mockOrder';
import OrderDetailModel from '../models/implementations/mock/mockOrderDetail';
import MockItemCart from '../models/implementations/mock/mockItemCart';

class OrderService {
  private async validateUser(user_id: number) {
    const user = await UserService.getById(user_id);
    if (!user) throw new Error('Usuario no existe');
    return user;
  }

  private calculateTotal(details: OrderDetail[]): number {
    return details.reduce((sum, d) => sum + d.getSubtotal(), 0);
  }

  private async _createOrder(
    user_id: number,
    items: { productId: number; quantity: number }[],
  ): Promise<Order> {
    if (items.length === 0) throw new Error('No se pueden crear órdenes vacías');

    const details: OrderDetail[] = [];

    for (const item of items) {
      const product = await ProductService.getById(item.productId);
      if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
      if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);

      await ProductService.decreaseStock(item.productId, item.quantity);

      const detail = await OrderDetailModel.create({
        order_id: 0, // temporal
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: product.price,
      });

      details.push(detail);
    }

    const total = this.calculateTotal(details);

    const order = await OrderModel.create({
      user_id,
      total,
      items,
    });

    details.forEach((d) => d.setOrderId(order.getId()));
    order.details = details;

    return order;
  }

  // ---------- Métodos públicos ----------

  async getAll(): Promise<Order[]> {
    return OrderModel.getAll();
  }

  async getById(id: number): Promise<Order | undefined> {
    return OrderModel.getById(id);
  }

  async getByUserId(userId: number): Promise<Order[]> {
    return OrderModel.getByUserId(userId);
  }

  async checkout(user_id: number): Promise<Order> {
    await this.validateUser(user_id);

    const cart = await CartService.getCartByUserId(user_id);
    if (!cart) throw new Error('Carrito no encontrado');

    const cartItems = await MockItemCart.getByCartId(cart.getCartId());
    const items = cartItems.map((i) => ({
      productId: i.getProductId(),
      quantity: i.getQuantity(),
    }));

    if (items.length === 0) throw new Error('El carrito está vacío');

    const order = await this._createOrder(user_id, items);

    await MockItemCart.clearByCartId(cart.getCartId());
    return order;
  }

  async create(data: OrderInput): Promise<Order> {
    await this.validateUser(data.user_id);
    return this._createOrder(data.user_id, data.items);
  }

  async delete(id: number): Promise<boolean> {
    return OrderModel.delete(id);
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order | undefined> {
    const order = await OrderModel.getById(id);
    if (!order) throw new Error('Orden no encontrada');

    if (order.status === 'cancel') throw new Error('No se puede modificar una orden cancelada');
    if (!['pending', 'paid', 'cancel'].includes(status)) throw new Error('Estado inválido');

    return OrderModel.updateStatus(id, status);
  }
}

export default new OrderService();
