// src/services/order.service.ts

import { Order } from '../models/interface/order.js';
import { OrderInput } from '../dtos/order.dto.js';
import { OrderStatus } from '../models/interface/order.js';

// Reemplazar esto luego con la implementación real de PostgreSQL
import OrderModel from '../models/implementations/mock/mockOrder.js';

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
    return OrderModel.create(data);
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
