import productService from '../../services/product.service';
import mockProduct from '../../models/implementations/mock/mockProduct';
import { Product } from '../../models/entity/product.entity';

describe('ProductService - Reglas de negocio', () => {
  beforeEach(() => {
    mockProduct.clear(); // reinicia el mock
  });

  it('crea un producto correctamente', async () => {
    const input = {
      name: 'Beta Alanina',
      price: 120,
      image: 'beta.jpg',
      category_id: 1,
      stock: 15,
      rating: 4.3,
      brand: 'Now',
      description: 'Suplemento de resistencia',
    };

    const created = await productService.createProduct(input);

    expect(created).toBeInstanceOf(Product);
    expect(created.name).toBe('Beta Alanina');
    expect(created.stock).toBe(15);
  });

  it('no permite disminuir stock si es insuficiente', async () => {
    const product = await productService.createProduct({
      name: 'Whey',
      price: 100,
      image: 'whey.jpg',
      category_id: 1,
      stock: 5,
      rating: 4.5,
      brand: 'Optimum',
      description: 'Proteína',
    });

    await expect(productService.decreaseStock(product.product_id, 10)).rejects.toThrow(
      'Stock insuficiente',
    );
  });

  it('disminuye el stock correctamente', async () => {
    const product = await productService.createProduct({
      name: 'Creatina',
      price: 80,
      image: 'creatina.jpg',
      category_id: 1,
      stock: 20,
      rating: 4.7,
      brand: 'MyProtein',
      description: 'Creatina pura',
    });

    const updated = await productService.decreaseStock(product.product_id, 5);
    expect(updated?.stock).toBe(15);
  });

  it('aumenta el stock correctamente', async () => {
    const product = await productService.createProduct({
      name: 'Glutamina',
      price: 50,
      image: 'glutamina.jpg',
      category_id: 1,
      stock: 10,
      rating: 4.6,
      brand: 'Optimum',
      description: 'Glutamina en polvo',
    });

    const updated = await productService.increaseStock(product.product_id, 5);
    expect(updated?.stock).toBe(15);
  });

  it('elimina un producto correctamente', async () => {
    const product = await productService.createProduct({
      name: 'Multivitamínico',
      price: 60,
      image: 'multi.jpg',
      category_id: 1,
      stock: 30,
      rating: 4.2,
      brand: 'Now',
      description: 'Vitaminas diarias',
    });

    const deleted = await productService.deleteProduct(product.product_id);
    expect(deleted).toBe(true);

    const check = await productService.getProductById(product.product_id);
    expect(check).toBeUndefined();
  });
});
