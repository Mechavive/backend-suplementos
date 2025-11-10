// src/services/order.service.ts

/* import { Order } from '../models/entity/order.entity';
import { OrderInput } from '../dtos/order.dto';
import { OrderStatus } from '../models/entity/order.entity';

// para metodos de stock
import ProductService from './product.service';
// para validar que un usuario existe para hacer una orden
import UserService from './user.service';

// Reemplazar esto luego con la implementación real de PostgreSQL
import OrderModel from '../models/implementations/mock/mockOrder';

class OrderService {
  async getAll(): Promise<Order[]> {
    return OrderModel.getAll();
  }

  async getById(id: number): Promise<Order | undefined> {
    return OrderModel.getById(id);
  }

  async getByUserId(userId: number): Promise<Order[]> {
    return OrderModel.getByUserId(userId);
  }

  async create(data: OrderInput): Promise<Order> {
    // 1. Validar que el usuario exista
    const user = await UserService.getById(data.user_id);
    if (!user) throw new Error('Usuario no existe');

    // TODO: 2. Validar stock (ver como cambia con order detail mas adelante)
    for (const item of data.items) {
      await ProductService.decreaseStock(item.productId, item.quantity);
    }

    // 3. Crear la orden
    const order = await OrderModel.create(data);
    return order;
  }

  async delete(id: number): Promise<boolean> {
    return OrderModel.delete(id);
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order | undefined> {
    return OrderModel.updateStatus(id, status);
  }

  // TODO: necesitamos mas validaciones en la logica de negocio. Ej: no crear una orden con un usuario que no existe
  // TODO: ese tipo de cosas estaria en esta capa de servicios o en el controlador?

  //  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
  //   const order = await OrderModel.getById(id);
  //   if (!order) {
  //     throw new Error("Orden no encontrada");
  //   }

  //   if (order.status === "cancel") {
  //     throw new Error("No se puede modificar una orden cancelada");
  //   }

  //   return OrderModel.updateStatus(id, status); // ya la modifica internamente
  // }
}

export default new OrderService(); */

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

  // private async validateAndPrepareDetails(items: { productId: number, quantity: number }[]): Promise<OrderDetail[]> {
  //   const details: OrderDetail[] = [];

  //   for (const item of items) {
  //     const product = await ProductService.getById(item.productId);
  //     if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
  //     if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);

  //     // Disminuir stock solo después de validar
  //     await ProductService.decreaseStock(item.productId, item.quantity);

  //     const detail = new OrderDetail(
  //       this.generateDetailId(),
  //       0, // order_id asignado después
  //       item.productId,
  //       item.quantity,
  //       product.price
  //     );

  //     details.push(detail);
  //   }

  //   return details;
  // }

  private calculateTotal(details: OrderDetail[]): number {
    return details.reduce((sum, d) => sum + d.getSubtotal(), 0);
  }

  // flujo:
  // CartService.getCartByUserId(userId) → [ItemCart]
  // → OrderService._createOrder → OrderDetailModel.create() → MockOrder.create()
  // → order.details = [OrderDetail]

  private async _createOrder(
    user_id: number,
    items: { productId: number; quantity: number }[],
  ): Promise<Order> {
    // const details = await this.validateAndPrepareDetails(items);
    // const total = this.calculateTotal(details);

    // const order = await OrderModel.create({
    //   user_id,
    //   total,
    //   items
    // });

    // order.details = details;

    const details: OrderDetail[] = [];

    for (const item of items) {
      const product = await ProductService.getById(item.productId);
      if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
      if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);

      await ProductService.decreaseStock(item.productId, item.quantity);

      const detail = await OrderDetailModel.create({
        order_id: 0, // temporal, luego se actualiza
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

    // actualizar order_id en los detalles
    details.forEach((d) => d.setOrderId(order.getId()));

    order.details = details;
    return order;
  }

  // ----------- Métodos públicos ------------

  async getAll(): Promise<Order[]> {
    return OrderModel.getAll();
  }

  async getById(id: number): Promise<Order | undefined> {
    return OrderModel.getById(id);
  }

  async getByUserId(userId: number): Promise<Order[]> {
    return OrderModel.getByUserId(userId);
  }

  // async checkout(user_id: number): Promise<Order> {
  //   await this.validateUser(user_id);

  //   const cart = await CartService.getCartByUserId(user_id);
  //   if (!cart) throw new Error('Carrito no encontrado');

  //   const items = cart.getItems().map(i => ({ productId: i.getProductId(), quantity: i.getQuantity() }));
  //   if (items.length === 0) throw new Error('El carrito está vacío');

  //   const order = await this._createOrder(user_id, items);

  //   cart.clear();
  //   return order;
  // }

  async checkout(user_id: number): Promise<Order> {
    // 1 Validar que el usuario existe
    await this.validateUser(user_id);

    // 2 Obtener el carrito del usuario
    const cart = await CartService.getCartByUserId(user_id);
    if (!cart) throw new Error('Carrito no encontrado');

    // 3 Obtener los items del carrito usando MockItemCart
    const cartItems = await MockItemCart.getByCartId(cart.getCartId());

    // 4 Mapear los items al formato que espera el servicio de orders
    const items = cartItems.map((i) => ({
      productId: i.getProductId(),
      quantity: i.getQuantity(),
    }));

    // 5 Validar que el carrito no esté vacío
    if (items.length === 0) throw new Error('El carrito está vacío');

    // 6 Crear la orden
    const order = await this._createOrder(user_id, items);

    // 7 Limpiar el carrito (opcional, si tu entidad Cart lo soporta)
    //await MockItemCart.itemCarts = MockItemCart.itemCarts.filter(ic => ic.getCartId() !== cart.getCartId());
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
