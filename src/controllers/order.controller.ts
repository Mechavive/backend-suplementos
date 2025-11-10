// src/controllers/order.controller.ts

import { Request, Response } from 'express';
import OrderService from '../services/order.service';
import { OrderStatus } from '../models/entity/order.entity';

class OrderController {
  // GET /api/orders
  async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  // GET /api/orders/:id
  async getById(req: Request, res: Response) {
    // Zod ya validó y transformó id a number
    const id = req.params.id as unknown as number;

    try {
      const order = await OrderService.getById(id);
      if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  // GET /api/orders/user/:userId
  async getByUserId(req: Request, res: Response) {
    const userId = req.params.userId as unknown as number;

    try {
      const orders = await OrderService.getByUserId(userId);
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  // POST /api/orders
  async create(req: Request, res: Response) {
    try {
      const newOrder = await OrderService.create(req.body);
      res.status(201).json(newOrder);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'No se pudo crear la orden' });
    }
  }

  // DELETE /api/orders/:id
  async delete(req: Request, res: Response) {
    const id = req.params.id as unknown as number;

    try {
      const success = await OrderService.delete(id);
      if (!success) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json({ message: 'Orden eliminada correctamente' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  // PATCH /api/orders/:id/status
  async updateStatus(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const { status } = req.body as { status: OrderStatus };

    try {
      const updated = await OrderService.updateStatus(id, status);
      if (!updated) return res.status(404).json({ error: 'Orden no encontrada' });
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error actualizando estado de la orden' });
    }
  }

  // POST /api/orders/checkout/:userId
  async checkout(req: Request, res: Response) {
    const userId = req.params.userId as unknown as number;

    try {
      const order = await OrderService.checkout(userId);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'No se pudo hacer checkout' });
    }
  }
}

export default new OrderController();
