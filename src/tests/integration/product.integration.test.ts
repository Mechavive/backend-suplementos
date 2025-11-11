// tests/integration/product.service.int.spec.ts

import productService from '../../services/product.service';
import { ProductInput } from '../../dtos/product.dto';
import mockProduct from '../../models/implementations/mock/mockProduct';
import { Product } from '../../models/entity/product.entity';

describe('ProductService - Integration Tests', () => {
  // Limpiar el mock antes de cada test
  beforeEach(() => {
    mockProduct.clear();
  });

  it('debería crear, obtener, actualizar y eliminar un producto', async () => {
    // Crear producto
    const input: ProductInput = {
      name: 'Beta Alanina',
      price: 120,
      image: 'beta.jpg',
      category_id: 1,
      stock: 15,
      rating: 4.3,
      brand: 'Now',
      description: 'Suplemento de resistencia',
    };

    const created: Product = await productService.create(input);
    expect(created.product_id).toBeDefined();
    expect(created.name).toBe(input.name);

    // Obtener producto por ID
    const found = await productService.getById(created.product_id);
    expect(found).toBeInstanceOf(Product);
    expect(found?.name).toBe(input.name);

    // Actualizar producto
    const updated = await productService.update(created.product_id, {
      price: 130,
      stock: 20,
    });
    expect(updated?.price).toBe(130);
    expect(updated?.stock).toBe(20);

    // Disminuir stock
    const decreased = await productService.decreaseStock(created.product_id, 5);
    expect(decreased?.stock).toBe(15);

    // Aumentar stock
    const increased = await productService.increaseStock(created.product_id, 10);
    expect(increased?.stock).toBe(25);

    // Eliminar producto
    const deleted = await productService.delete(created.product_id);
    expect(deleted).toBe(true);

    // Verificar que no existe
    const shouldBeUndefined = await productService.getById(created.product_id);
    expect(shouldBeUndefined).toBeUndefined();
  });

  it('debería retornar todos los productos creados', async () => {
    // Crear varios productos
    const inputs: ProductInput[] = [
      {
        name: 'Whey',
        price: 100,
        image: 'whey.jpg',
        category_id: 1,
        stock: 10,
        rating: 4.5,
        brand: 'Optimum',
        description: 'Proteína',
      },
      {
        name: 'Creatina',
        price: 80,
        image: 'creatina.jpg',
        category_id: 1,
        stock: 5,
        rating: 4.7,
        brand: 'MyProtein',
        description: 'Creatina pura',
      },
    ];

    for (const input of inputs) {
      await productService.create(input);
    }

    const all = await productService.getAll();
    expect(all.length).toBe(2);
    expect(all.map((p) => p.name)).toEqual(expect.arrayContaining(['Whey', 'Creatina']));
  });
});
