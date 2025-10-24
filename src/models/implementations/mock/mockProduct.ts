// src/models/implementations/mockProduct/mockProduct.ts

import { Product } from '../../entity/product.entity.js';
import { ProductCrud } from '../../crud/productCrud.interface.js';

export type ProductUpdate = Partial<Omit<Product, 'product_id'>>;

export class MockProduct implements ProductCrud {
  private products: Product[] = [];
  private idCounter = 1;

  constructor() {
    // Datos iniciales simulados
    this.products = [
      {
        product_id: this.idCounter++,
        name: 'Proteína Whey',
        price: 15000,
        image: 'whey.jpg',
        category_id: 1,
        stock: 10,
        rating: 4.5,
        brand: 'Optimum',
        description: 'Proteína en polvo para aumentar masa muscular.',
      },
      {
        product_id: this.idCounter++,
        name: 'Creatina',
        price: 8000,
        image: 'creatina.jpg',
        category_id: 1,
        stock: 20,
        rating: 4.8,
        brand: 'MyProtein',
        description: 'Creatina monohidratada pura.',
      },
    ];
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getById(id: number): Promise<Product | undefined> {
    return this.products.find((p) => p.product_id === id);
  }

  async create(product: Omit<Product, 'product_id'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      product_id: this.idCounter++,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, data: ProductUpdate): Promise<Product | undefined> {
    const index = this.products.findIndex((p) => p.product_id === id);
    if (index === -1) return undefined;

    const existing = this.products[index]!; // le digo a ts que no es undefined con !

    const updated = {
      ...existing, // clono el producto original
      ...data, // sobreescribo campos que se incluyeron en el update
      product_id: existing.product_id, // protección contra intentos de actualizar el ID (que debería ser inmutable
    } as Product; // le dice a TypeScript que es un Product completo y válido

    this.products[index] = updated;
    return updated;
  }

  async delete(id: number): Promise<boolean> {
    const originalLength = this.products.length;
    this.products = this.products.filter((p) => p.product_id !== id);
    return this.products.length < originalLength;
  }

  // Método útil para tests
  clear(): void {
    this.products = [];
    this.idCounter = 1;
  }
}

export default new MockProduct();
