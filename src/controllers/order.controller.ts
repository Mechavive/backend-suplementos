// src/controllers/order.controller.ts

import { Request, Response } from 'express';
import OrderService from '../services/order.service.js';
import { OrderStatus } from '../models/interface/order.js';

class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const order = await OrderService.getById(id);
      if (!order) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      return res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async getByUserId(req: Request, res: Response) {
    const userIdParam = req.params.userId;

    if (!userIdParam) {
      return res.status(400).json({ error: 'userId es requerido' });
    }

    const userId = parseInt(userIdParam);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'userId inválido' });
    }

    try {
      const orders = await OrderService.getByUserId(userId);
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newOrder = await OrderService.create(req.body);
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'No se pudo crear la orden' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    try {
      const success = await OrderService.delete(id);
      if (!success) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.status(200).json({ message: 'Orden eliminada correctamente' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async updateStatus(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { status } = req.body;
    if (!status || !['pending', 'paid', 'cancel'].includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    try {
      const updated = await OrderService.updateStatus(id, status as OrderStatus);
      if (!updated) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error actualizando estado de la orden' });
    }
  }
}

export default new OrderController();
