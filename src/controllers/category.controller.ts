import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

export class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const Categories = await CategoryService.getAll();
      res.status(200).json(Categories);
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
      const category = await CategoryService.getById(id);
      if (!category) {
        return res.status(404).json({ error: 'Category no encontrado' });
      }
      res.json(category);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newCategory = await CategoryService.create(req.body);
      res.status(201).json(newCategory);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    try {
      await CategoryService.delete(id);
      const category = await CategoryService.getById(id);
      if (!category) {
        return res.status(404).json({ error: 'Category no encontrado' });
      }
      res.status(200).json({ message: 'Item carrito eliminado correctamente' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Error interno del servidor' });
    }
  }
}
