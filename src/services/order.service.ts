// src/services/order.service.ts

import { Order } from '../models/entity/order.entity';
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

export default new OrderService();
