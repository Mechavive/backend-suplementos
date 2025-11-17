// src/services/product.service.ts

import MockProductModel from '../models/implementations/mock/mockProduct';
import { Product } from '../models/entity/product.entity';
import { ProductUpdate, ProductInput } from '../dtos/product.dto';
import CategoryService from './category.service';

class ProductService {
  async getAll(): Promise<Product[]> {
    return MockProductModel.getAll();
  }

  async getById(id: number): Promise<Product | undefined> {
    return MockProductModel.getById(id);
  }

  // async create(data: ProductInput): Promise<Product> {
  //   return MockProductModel.create(data);
  // }

  // verifica que la categoria existe
  async create(data: ProductInput): Promise<Product> {
    const category = await CategoryService.getById(data.category_id);
    if (!category) {
      throw new Error(`La categoría con id ${data.category_id} no existe`);
    }

    return MockProductModel.create(data);
  }

  /* async update(id: number, data: ProductUpdate): Promise<Product | undefined> {
    return MockProductModel.update(id, data);
  } */

  // verifica que la categoria existe
  async update(id: number, data: ProductUpdate): Promise<Product | undefined> {
    if (data.category_id) {
      const category = await CategoryService.getById(data.category_id);
      if (!category) {
        throw new Error(`La categoría con id ${data.category_id} no existe`);
      }
    }
    return MockProductModel.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    return MockProductModel.delete(id);
  }

  // Manejo del stock (lo usariamos en ordenes)
  async decreaseStock(productId: number, quantity: number): Promise<Product | undefined> {
    const product = await this.getById(productId);
    if (!product) throw new Error('Producto no encontrado');
    if (product.stock < quantity) throw new Error('Stock insuficiente');

    return MockProductModel.update(productId, { stock: product.stock - quantity });
  }

  async increaseStock(productId: number, quantity: number): Promise<Product | undefined> {
    const product = await this.getById(productId);
    if (!product) throw new Error('Producto no encontrado');

    return MockProductModel.update(productId, { stock: product.stock + quantity });
  }
}

export default new ProductService();
