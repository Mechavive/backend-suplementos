// src/services/product.service.ts

import MockProductModel from '../models/implementations/mock/mockProduct.js';
import { Product } from '../models/interface/product.js';
import { ProductUpdate } from '../models/implementations/mock/mockProduct.js';

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return MockProductModel.getAll();
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return MockProductModel.getById(id);
  }

  async createProduct(data: Omit<Product, 'product_id'>): Promise<Product> {
    return MockProductModel.create(data);
  }

  async updateProduct(id: number, data: ProductUpdate): Promise<Product | undefined> {
    return MockProductModel.update(id, data);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return MockProductModel.delete(id);
  }
}

export default new ProductService();
