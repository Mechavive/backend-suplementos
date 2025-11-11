// src/services/product.service.ts

import MockProductModel from '../models/implementations/mock/mockProduct';
import { Product } from '../models/entity/product.entity';
import { ProductUpdate, ProductInput } from '../dtos/product.dto';

class ProductService {
  async getAll(): Promise<Product[]> {
    return MockProductModel.getAll();
  }

  async getById(id: number): Promise<Product | undefined> {
    return MockProductModel.getById(id);
  }

  async create(data: ProductInput): Promise<Product> {
    return MockProductModel.create(data);
  }

  async update(id: number, data: ProductUpdate): Promise<Product | undefined> {
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
