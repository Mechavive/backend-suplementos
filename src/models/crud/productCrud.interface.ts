// src/models/crud/productCrud.interface.ts

import { Product } from '../interface/product.js';

export interface ProductCrud {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | undefined>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product | undefined>;
  delete(id: number): Promise<boolean>;
}
